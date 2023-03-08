const postitService = require('../services/postit.service');
const constants = require("../constants/constants");
const { MESSAGES } = constants;

class PostitController {
    async createPostit(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

    async fetchAllPostits(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    }

    async createPostit(req, res) {
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
