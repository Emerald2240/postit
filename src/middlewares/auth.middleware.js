const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

//use json web token node module to validate access tokens and get encrypted user data
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401)
            .send({ message: "Missing access token. Pass it in the headers: Auth section. In this format: 'Bearer sdfweuwe324wrw324sxs...'" });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403)
                .send({ message: "Please login first", err });

            //Checks if user actually exists or if an access token has been forged
            try {
                let verifyUserExists = authService.verifyUserExists(user._id, user.email);
                if (verifyUserExists) {
                    req.user = user;
                    next();
                } else {
                    return res.status(403)
                        .send({ message: "Invalid User Profile", err });
                }
            } catch (err) {
                return res
                    .status(500)
                    .send({ message: err.message || MESSAGES.ERROR, success: false });
            }
        });
    }
}

module.exports = authenticateToken