const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")

const { signUpSchema, emailSchema, userIdSchema, updateUserSchema } = require("../validators/schemas/user.schema");

//CREATE
//Register Account
userRouter.post("/", [validateBody(signUpSchema)], userController.signUp);

//READ
//get a particular user with email
userRouter.get("/:email", [validateParams(emailSchema), authenticateToken], userController.fetchUser);

//get a particular user with user id
userRouter.get("/id/:userId", [validateParams(userIdSchema), authenticateToken, adminAuthorization], userController.fetchUserWithId);

//Get all users with pagination [admin]
userRouter.get("/:pagination", /*[authenticateToken, adminAuthorization],*/ userController.fetchAllUsers);

//get all deleted users with pagination [admin]
userRouter.get("/deleted/:pagination", /*[authenticateToken, adminAuthorization],*/ userController.fetchAllDeletedUsers);


//UPDATE
//update your profile
userRouter.patch("/", [validateBody(updateUserSchema), authenticateToken], userController.updateUserProfile);

//DELETE
//Delete user account
userRouter.delete("/", [authenticateToken], userController.deleteUserAccount);

module.exports = userRouter;