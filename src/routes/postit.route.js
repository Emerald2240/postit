const express = require('express');
const postitRouter = express.Router();
const postitController = require('../controllers/postit.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")
const { createPostitSchema, getAllPostitsSchema, getUserDeletedPostitsSchema, getExternalUsersPostitsSchema, postitIdSchema, updatePostitSchema } = require("../validators/schemas/postit.schema");


//documentation redirect
postitRouter.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQPF8');
});

//default response
postitRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//create postit   
postitRouter.post("/", [validateBody(createPostitSchema), authenticateToken], postitController.createPostit);

//get all postits [admin]
postitRouter.get("/admin/:pagination", [validateParams(getAllPostitsSchema), authenticateToken, adminAuthorization], postitController.getAllPostits);

//get all deleted postits [admin]
postitRouter.get("/deleted/:pagination", [validateParams(getAllPostitsSchema), authenticateToken, adminAuthorization], postitController.getAllDeletedPostits);

//get all postits created by logged in user
postitRouter.get("/:pagination", [validateParams(getAllPostitsSchema), authenticateToken], postitController.getUserPostits);

//get postits created by an external user handle
postitRouter.get("/users/@:userHandle/:pagination", [validateParams(getExternalUsersPostitsSchema), authenticateToken], postitController.getExternalUserPostits);

//find a particular postit using its postitid
postitRouter.get("/single/:postitId", [validateParams(postitIdSchema), authenticateToken], postitController.getSinglePostit);

//find a particular deleted postit using its postitid [admin]
postitRouter.get("/deleted/single/:postitId", [validateParams(postitIdSchema), authenticateToken, adminAuthorization], postitController.getSingleDeletedPostit);

//get all postits deleted softly by user [admin]     
postitRouter.get("/deleted/users/@:userHandle/:pagination", [validateParams(getUserDeletedPostitsSchema), authenticateToken, adminAuthorization], postitController.getUserDeletedPostits);

//update postit by its Id
postitRouter.patch("/:postitId", [validateParams(postitIdSchema), validateBody(updatePostitSchema), authenticateToken], postitController.updatePostit);

//soft delete postit
postitRouter.delete("/:postitId", [validateParams(postitIdSchema), authenticateToken], postitController.deletePostit);


module.exports = postitRouter;