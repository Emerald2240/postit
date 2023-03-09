const express = require('express');
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const constants = require("../constants/constants");
const { MESSAGES } = constants;
const authService = require("../services/auth.service");
const jwt = require('jsonwebtoken');

var user = [];
var refreshTokenStore = '';

class AuthController {

    //Once a user logs in, an expirable access token and an inexpirable refresh token is provided. This is for security reasons... The refresh token creates a new access token once the former one expires
    async refreshAccessToken(req, res) {
        const refreshToken = req.body.token;
        if (refreshToken == null) {
            return res.status(401).send({ message: "Missing refresh token body parameter" });
        } else {
            if (refreshTokenStore !== refreshToken) {
                return res.status(403).send({ message: "Invalid token", success: false });
            } else {

                //verify if refresh token is valid
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        return res.status(403).send(err);
                    } else {
                        
                        //create a new access token
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                        res.json({ accessToken: accessToken });
                    }
                })
            }
        }
    }

    //Takes an email and password in the query body and checks the db if they match
    async login(req, res) {

        try {
            //pass the data to the login service module
            user = await authService.login(req.body.email, req.body.password);
            // console.log(user);
            if (user) {

                //creates new access token and refresh token for the user
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                refreshTokenStore = refreshToken;
                res.status(200)
                    .json({ message: MESSAGES.LOGGED_IN, accessToken: accessToken, refreshToken: refreshToken });
            } else {
                res.status(403)
                    .send({ message: MESSAGES.LOGIN_FAILURE, success: false });
            }

        } catch (err) {
            res.status(418).send({ message: "Invalid credentials", success: false })
        }
    }

    //Deletes the refresh token from the app
    async logout(req, res) {
        if (refreshTokenStore != '') {
            refreshTokenStore = '';
            res.status(200).send({ message: MESSAGES.LOGOUT, success: true });
        } else {
            res.status(404).send({ message: MESSAGES.LOGIN_FIRST, success: true });
        }
    }

}

module.exports = new AuthController();