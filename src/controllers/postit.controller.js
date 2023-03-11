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

    async getSinglePostit(req, res) {
        let postitId = req.params.postitId;

        try {
            const data = await postitService.findPostit(postitId);

            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }

    }

    async getSingleDeletedPostit(req, res) {
        let postitId = req.params.postitId;

        try {
            const data = await postitService.findDeletedPostit(postitId);

            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }

    }

    async getUserPostits(req, res) {
        try {
            let userId = req.user._id;
            let pagination = req.params.pagination * 10;
            const data = await postitService.getUserPostits(userId, pagination);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }

        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async getExternalUserPostits(req, res) {
        try {
            let userHandle = req.params.userHandle;
            let pagination = req.params.pagination * 10;
            const data = await postitService.getExternalUserPostits(userHandle, pagination);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async updatePostit(req, res) {
        try {
            let postitId = req.params.postitId;
            let update = req.body
            const data = await postitService.updatePostit(postitId, update);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }

        } catch (err) {

            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async deletePostit(req, res) {
        // console.log(req.user);
        try {
            let postitId = req.params.postitId;
            const data = await postitService.deletePostit(postitId, req.user._id);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit doesnt exist", success: false })
            }

        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async getUserDeletedPostits(req, res) {
        try {
            let userHandle = req.params.userHandle;
            let pagination = req.params.pagination * 10;
            const data = await postitService.getUserDeletedPostits(userHandle, pagination);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

}

module.exports = new PostitController();
