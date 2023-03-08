const express = require('express');
const postitRouter = express.Router();
const postitController = require('../controllers/postit.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")
const { createPostitSchema, getAllPostitsSchema, getUserDeletedPostitsSchema, getExternalUsersPostitsSchema, postitIdSchema, updatePostitSchema } = require("../validators/schemas/postit.schema");

//Create Postit
postitRouter.post("/", [validateBody(createPostitSchema), authenticateToken], postitController.createPostit);

//Get all postits created by logged in user
postitRouter.get("/:pagination", [validateParams(getAllPostitsSchema), authenticateToken], postitController.fetchAllPostits);

//Get postits created by an external user handle
postitRouter.get("/:handle/:pagination", [validateParams(getExternalUsersPostitsSchema), authenticateToken, adminAuthorization], postitController.getExternalUserPostits);

//Update postit by its Id
postitRouter.patch("/:postitId", [validateParams(postitIdSchema), validateBody(updatePostitSchema), authenticateToken], postitController.updatePostit);

//Soft Delete postit
postitRouter.delete("/:postitId", [validateParams(postitIdSchema), authenticateToken], postitController.deletePostit);








/////////////// ADMIN /////////////////////////////////

//Get all postits deleted softly by user [admin]
postitRouter.get("/deleted/:handle/:pagination", [validateParams(getUserDeletedPostitsSchema), authenticateToken, adminAuthorization], postitController.getUserDeletedPostits);






module.exports = postitRouter;