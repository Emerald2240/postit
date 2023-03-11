const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")

const { signUpSchema, emailSchema, updateUserSchema } = require("../validators/schemas/user.schema");

//CREATE
//Register Account
userRouter.post("/", [validateBody(signUpSchema)], userController.signUp);

//READ
//Get all users with pagination [admin]
userRouter.get("/:pagination", /*[authenticateToken, adminAuthorization],*/ userController.fetchAllUsers);

//get all deleted users with pagination [admin]
userRouter.get("/deleted/:pagination", /*[authenticateToken, adminAuthorization],*/ userController.fetchAllDeletedUsers);

//get a particular user
userRouter.get("/:email", [validateParams(emailSchema), authenticateToken, adminAuthorization], userController.fetchUser);

//UPDATE
//update your profile
userRouter.patch("/:email", [validateParams(emailSchema), validateBody(updateUserSchema), authenticateToken], userController.updateUserProfile);

//DELETE
//Delete user account
userRouter.delete("/:email", [validateParams(emailSchema), authenticateToken], userController.deleteUserAccount);

module.exports = userRouter;