const express = require('express');
const postitRouter = express.Router();
const postitController = require('../controllers/postit.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")
const { createPostitSchema, getAllPostitsSchema, getUserDeletedPostitsSchema, getExternalUsersPostitsSchema, postitIdSchema, updatePostitSchema } = require("../validators/schemas/postit.schema");


//Documentation redirect
postitRouter.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQPF8');
});

//Create Postit   
postitRouter.post("/", [validateBody(createPostitSchema), authenticateToken], postitController.createPostit);

//Get all postits [admin]
postitRouter.get("/all/:pagination", [validateParams(getAllPostitsSchema), authenticateToken, adminAuthorization], postitController.getAllPostits);

//Get all deleted postits [admin]
postitRouter.get("/all-deleted/:pagination", [validateParams(getAllPostitsSchema), authenticateToken, adminAuthorization], postitController.getAllDeletedPostits);

//Get all postits created by logged in user
postitRouter.get("/:pagination", [validateParams(getAllPostitsSchema), authenticateToken], postitController.getUserPostits);

//Get postits created by an external user handle
postitRouter.get("/external/@:userHandle/:pagination", [validateParams(getExternalUsersPostitsSchema), authenticateToken], postitController.getExternalUserPostits);

//Find a particular postit using its postitid
postitRouter.get("/single/:postitId", [validateParams(postitIdSchema), authenticateToken], postitController.getSinglePostit);

//Find a particular deleted postit using its postitid [admin]
postitRouter.get("/single-deleted/:postitId", [validateParams(postitIdSchema), authenticateToken, adminAuthorization], postitController.getSingleDeletedPostit);

//Get all postits deleted softly by user [admin]     
postitRouter.get("/deleted/@:userHandle/:pagination", [validateParams(getUserDeletedPostitsSchema), authenticateToken, adminAuthorization], postitController.getUserDeletedPostits);

//Update postit by its Id
postitRouter.patch("/:postitId", [validateParams(postitIdSchema), validateBody(updatePostitSchema), authenticateToken], postitController.updatePostit);

//Soft Delete postit
postitRouter.delete("/:postitId", [validateParams(postitIdSchema), authenticateToken], postitController.deletePostit);




module.exports = postitRouter;