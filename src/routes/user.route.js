const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const {validateBody} = require("../validators/validatorBody");
const {validateParams} = require("../validators/validatorParams");

const {signUpSchema, emailSchema, updateUserSchema} = require("../validators/schemas/user.schema");

//CREATE
userRouter.post("/",[validateBody(signUpSchema)], userController.signUp);

//READ
userRouter.get("/", userController.fetchAllUsers);
userRouter.get("/deleted", userController.fetchAllDeletedUsers);
userRouter.get("/:email", [validateParams(emailSchema)],  userController.fetchUser);

//UPDATE
userRouter.patch("/:email",  [validateParams(emailSchema), validateBody(updateUserSchema)],  userController.updateUserProfile);

//DELETE
userRouter.delete("/:email",  [validateParams(emailSchema)],  userController.deleteUserAccount);

module.exports = userRouter;