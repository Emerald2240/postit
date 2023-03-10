const controllerService = require("../services/comment.service");
const constants = require("../constants/constants");
const { MESSAGES } = constants;

class CommentController {
    async getStatus(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    };

    //Create a comment
    async comment(req, res) {
        let postitId = req.params.postitId;
        let commentBody = req.body.body;

        try {
            const data = await commentService.createComment(postitId, commentBody);

            res.status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Get all comments for a particular postit
    async getAllCommentsForPostit(req, res) {
        let postitId = req.params.postitId;
        let pagination = req.params.pagination

        try {
            const data = await commentService.getAllCommentsForPostits(postitId, pagination);

            res.status(201)
                .send({ message: MESSAGES.FETCHED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Get a particular comment with its comment ID
    async getParticularComment(req, res) {
        let commentId = req.params.commentId;

        try {
            const data = await commentService.getComment(commentId);

            res.status(201)
                .send({ message: MESSAGES.FETCHED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Use text to search for comments under a particular postit
    async searchPostitComments(req, res) {
        let postitId = req.params.postitId;
        let pagination = req.params.pagination;
        let searchText = req.body.searchText;

        try {
            const data = await commentService.searchComments(postitId, pagination, searchText);

            res.status(201)
                .send({ message: MESSAGES.FETCHED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Get all deleted comments under a particular postit
    async getAllDeletedCommentsForPostit(req, res) {
        let postitId = req.params.postitId;
        let pagination = req.params.pagination;

        try {
            const data = await commentService.getDeletedPostitComments(postitId, pagination);

            res.status(201)
                .send({ message: MESSAGES.FETCHED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Get all comments deleted by a particular user
    async getAllUserDeletedComments(req, res) {
        let userId = req.params.userId;
        let pagination = req.params.pagination;

        try {
            const data = await commentService.getAllUserDeletedComments(userId, pagination);

            res.status(201)
                .send({ message: MESSAGES.FETCHED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    // Update a particular comment
    async editComment(req, res) {
        let commentId = req.params.commentId;
        let commentUpdateBody = req.body.body;

        try {
            const data = await commentService.updateComment(commentId, commentUpdateBody);

            res.status(201)
                .send({ message: MESSAGES.UPDATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Delete a particular comment
    async deleteComment(req, res) {
        let commentId = req.params.commentId;

        try {
            const data = await commentService.deleteComment(commentId);

            res.status(201)
                .send({ message: MESSAGES.DELETED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }


}

module.exports = new CommentController();