const postitService = require('../services/postit.service');
const constants = require("../constants/constants");
const { MESSAGES } = constants;

class PostitController {
    async createPostit(req, res) {
        try {
            req.body.user_id = req.user._id;
            const data = await postitService.createPostit(req.body);
            res.status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }













    async fetchAllPostits(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

    async getExternalUserPostits(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

    async updatePostit(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

    async deletePostit(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

    async getUserDeletedPostits(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

}

module.exports = new PostitController();
