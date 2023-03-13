const postitService = require('../services/postit.service');
const constants = require("../constants/constants");
const { MESSAGES } = constants;

class PostitController {
    //creates a particular postit. User value is set during authentication
    async createPostit(req, res) {
        try {
            req.body.user_id = req.user._id;

            const data = await postitService.createPostit(req.body);
            res.status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get all postits that are not deleted
    async getAllPostits(req, res) {
        try {
            let pagination = req.params.pagination * 10;

            const data = await postitService.getAllPostits(pagination);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false });
            }
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get all deleted postits
    async getAllDeletedPostits(req, res) {
        try {
            let pagination = req.params.pagination * 10;

            const data = await postitService.getAllDeletedPostits(pagination);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false });
            }
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get/find single postit with its Id
    async getSinglePostit(req, res) {
        try {
            let postitId = req.params.postitId;

            const data = await postitService.findPostit(postitId);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }

    }

    //get/find a single deleted postit with its id
    async getSingleDeletedPostit(req, res) {
        try {
            let postitId = req.params.postitId;

            const data = await postitService.findDeletedPostit(postitId);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }

    }

    //get all postits for a particular user
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
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get/find a particular users postits using their @handle
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
                    .send({ message: "User not found", success: false });
            }
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //update a single postit. Find it with its Id
    async updatePostit(req, res) {
        try {
            let postitId = req.params.postitId;
            let update = req.body;
            let userId = req.user._id;

            const data = await postitService.updatePostit(postitId, update, userId);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }

        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //delete postit with its id
    async deletePostit(req, res) {
        try {
            let postitId = req.params.postitId;

            const data = await postitService.deletePostit(postitId, req.user._id);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Postit not found", success: false })
            }

        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //get all postits deleted by a particular user
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
                    .send({ message: "User not found", success: false });
            }
        } catch (err) {
            res.status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

}

module.exports = new PostitController();
