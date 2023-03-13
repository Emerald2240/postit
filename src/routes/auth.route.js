const express = require('express');
const authRouter = express.Router();
const constants = require("../constants/constants");
const { MESSAGES } = constants;
const authController = require("../controllers/auth.controller");
const { validateBody } = require("../validators/validatorBody");
const { loginSchema, refreshTokenSchema } = require("../validators/schemas/auth.schema");


//default response
authRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//documentation redirect
authRouter.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQioY');
});

//refresh token
authRouter.get("/token", validateBody(refreshTokenSchema), authController.refreshAccessToken);

//login
authRouter.post("/login", validateBody(loginSchema), authController.login);

//logout
authRouter.delete("/logout", authController.logout);


module.exports = authRouter;