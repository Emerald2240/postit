const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const {validateBody} = require("../validators/validatorBody");
const {validateParams} = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")

const {signUpSchema, emailSchema, updateUserSchema} = require("../validators/schemas/user.schema");

//CREATE
userRouter.post("/",[validateBody(signUpSchema)], userController.signUp);

//READ
userRouter.get("/", [authenticateToken, adminAuthorization], userController.fetchAllUsers);

userRouter.get("/deleted", [authenticateToken, adminAuthorization], userController.fetchAllDeletedUsers);
userRouter.get("/:email", [validateParams(emailSchema), authenticateToken, adminAuthorization], userController.fetchUser);

//UPDATE
userRouter.patch("/:email",  [validateParams(emailSchema), validateBody(updateUserSchema), authenticateToken],  userController.updateUserProfile);

//DELETE
userRouter.delete("/:email",  [validateParams(emailSchema), authenticateToken],  userController.deleteUserAccount);

module.exports = userRouter;