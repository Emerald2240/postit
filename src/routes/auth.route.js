const express = require('express');
const authRouter = express.Router();
const constants = require("../constants/constants");
const { MESSAGES } = constants;
const authController = require("../controllers/auth.controller");
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const { loginSchema, refreshTokenSchema } = require("../validators/schemas/auth.schema");

authRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});
authRouter.get("/token", validateBody(refreshTokenSchema), authController.refreshAccessToken);

authRouter.post("/login", validateBody(loginSchema), authController.login);

authRouter.delete("/logout", authController.logout);

module.exports = authRouter;