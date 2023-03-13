const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")
const { userHandleSchema, signUpSchema, emailSchema, userIdSchema, updateUserSchema } = require("../validators/schemas/user.schema");


//documentation redirect
userRouter.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQioa');
});

//default response
userRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//register Account
userRouter.post("/", [validateBody(signUpSchema)], userController.signUp);

//get all users with pagination [admin]
userRouter.get("/:pagination", [authenticateToken, adminAuthorization], userController.fetchAllUsers);

//get a particular user with email
userRouter.get("/email/:email", [validateParams(emailSchema), authenticateToken], userController.fetchUser);

//get a particular user with handle
userRouter.get("/handle/@:userHandle", [validateParams(userHandleSchema), authenticateToken], userController.fetchUserWithHandle);

//get a particular user with user id
userRouter.get("/id/:userId", [validateParams(userIdSchema), authenticateToken], userController.fetchUserWithId);

//get all deleted users with pagination [admin]
userRouter.get("/deleted/:pagination", [authenticateToken, adminAuthorization], userController.fetchAllDeletedUsers);

//update your profile
userRouter.patch("/", [validateBody(updateUserSchema), authenticateToken], userController.updateUserProfile);

//delete user account
userRouter.delete("/", [authenticateToken], userController.deleteUserAccount);


module.exports = userRouter;