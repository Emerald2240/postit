const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");
const PostitService = require("./postit.service");
const constants = require("../constants/constants");
const { DATABASES } = constants;

class CommentService {
    async createComment(body) {
        console.log(body);
        let postitId = body.postit_ref_id;
     let postitInfo = await PostitService.findPostit('640c7b2aac99cda979f14405');
        if (postitInfo) {
            //create the actual comment body
            let createdComment = await Comment.create(body);
            if (createdComment) {
                return {postit: postitInfo, comment: createdComment}
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    async getAllCommentsForPostit(postitId, pagination) {
        return { message: "It works", success: true }
    }

    async getComment(commentId) {
        return { message: "It works", success: true }
    }

    async searchComments(postitId, pagination, searchText) {
        return { message: "It works", success: true }
    }

    async getDeletedPostitComments(postitId, pagination) {
        return { message: "It works", success: true }
    }

    async getAllUserDeletedComments(userId, pagination) {
        return { message: "It works", success: true }
    }

    async updateComment(commentId, body) {
        return { message: "It works", success: true }
    }

    async deleteComment(commentId) {
        return { message: "It works", success: true }
    }
}

module.exports = new CommentService();