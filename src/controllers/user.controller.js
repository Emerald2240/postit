const userService = require('../services/user.service');
const constants = require("../constants/constants");
const { generateRandomAvatar } = require("../vendors/dicebar");

const { MESSAGES } = constants;

class UserController {

    async getStatus(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    };

    //Create a new user
    async signUp(req, res) {

        try {
            req.body.avatar = await generateRandomAvatar(req.body.email);
            const data = await userService.createUser(req.body);
            res
                .status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get user from the database, using their email
    async fetchUser(req, res) {
        try {
            const data = await userService.getUser(req.params.email);

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get user from the database, using their email
    async fetchUserWithId(req, res) {
        try {
            const data = await userService.getUserWithUserId(req.params.userId);

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get all users in the user collection/table
    async fetchAllUsers(req, res) {
        try {
            let pagination = req.params.pagination * 10;
            const data = await userService.getAllUsers(pagination);

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get all users in the user collection/table
    async fetchAllDeletedUsers(req, res) {
        try {
            let pagination = req.params.pagination * 10;
            const data = await userService.getAllDeletedUsers(pagination);

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Update/edit user data
    async updateUserProfile(req, res) {
        try {
            req.body.avatar = await generateRandomAvatar(req.user.email);
            const data = await userService.updateUserByEmail(req.user.email, req.body);

            if (data) {
                res
                    .status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Delete user account entirely from the database
    async deleteUserAccount(req, res) {
        try {
            const data = await userService.deleteUser(req.user.email);
            if (data) {
                res
                    .status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }

        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

}

module.exports = new UserController();