const commentService = require("../services/comment.service");
const constants = require("../constants/constants");
const { MESSAGES } = constants;

class CommentController {
    async getStatus(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    };

    //get all comments that are not deleted
    async getAllComments(req, res) {
        let pagination = req.params.pagination * 10;
        const data = await commentService.getAllComments(pagination);

        res.status(201)
            .send({ message: MESSAGES.FETCHED, success: true, data });
    }

    //get a particular comment under a particular postit
    async getCommentUnderPostit(req, res) {
        let postitId = req.params.postitId;
        let commentId = req.params.commentId;

        try {
            const data = await commentService.getCommentUnderPostit(postitId, commentId);
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

    //get a particular comment under a particular postit under a particular user
    async getCommentUnderPostitUnderUser(req, res) {
        let userId = req.params.userId;
        let postitId = req.params.postitId;
        let commentId = req.params.commentId;

        try {
            const data = await commentService.getCommentUnderPostitUnderUser(userId, postitId, commentId);
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

    //Get all comments by a particular user
    async getAllUserComments(req, res) {
        let userId = req.params.userId;
        let pagination = req.params.pagination * 10;
        try {
            const data = await commentService.getAllCommentsUnderUser(userId, pagination);
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

    //get all deleted comments
    async getAllDeletedComments(req, res) {
        let pagination = req.params.pagination * 10;

        const data = await commentService.getAllDeletedComments(pagination);

        res.status(201)
            .send({ message: MESSAGES.FETCHED, success: true, data });
    }

    //Create a comment
    async comment(req, res) {
        let commentBody = {
            user_id: req.user._id,
            postit_ref_id: req.params.postitId,
            body: req.body.body
        }

        try {
            const data = await commentService.createComment(commentBody);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.CREATED, success: true, data });
            } else {
                res.status(403)
                    .send({ message: MESSAGES.ERROR, success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Get all comments for a particular postit
    async getAllCommentsForPostit(req, res) {
        let postitId = req.params.postitId;
        let pagination = req.params.pagination * 10;

        try {
            const data = await commentService.getAllCommentsForPostit(postitId, pagination);
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

    //Get a particular comment with its comment ID
    async getParticularComment(req, res) {
        let commentId = req.params.commentId;

        try {
            const data = await commentService.getComment(commentId);

            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Comment not found", success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Use text to search for comments under a particular postit
    async searchPostitComments(req, res) {
        let postitId = req.params.postitId;
        let pagination = req.params.pagination * 10;
        let searchText = req.body.searchText;

        try {
            const data = await commentService.searchComments(postitId, pagination, searchText);

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

    //Get all deleted comments under a particular postit
    async getAllDeletedCommentsForPostit(req, res) {
        let postitId = req.params.postitId;
        let pagination = req.params.pagination * 10;

        try {
            const data = await commentService.getDeletedPostitComments(postitId, pagination);

            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Not found", success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Get all comments deleted by a particular user
    async getAllUserDeletedComments(req, res) {
        let userId = req.params.userId;
        let pagination = req.params.pagination * 10;

        try {
            const data = await commentService.getAllUserDeletedComments(userId, pagination);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "User Not found", success: false })
            }
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
        let userId = req.user._id;

        try {
            const data = await commentService.updateComment(commentId, commentUpdateBody, userId);

            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Comment not found", success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    //Delete a particular comment
    async deleteComment(req, res) {
        let commentId = req.params.commentId;
        let userId = req.user._id;

        try {
            const data = await commentService.deleteComment(commentId, userId);
            if (data) {
                res.status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            } else {
                res.status(404)
                    .send({ message: "Comment not found", success: false })
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }


}

module.exports = new CommentController();