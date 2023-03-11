const Comment = require("../models/CommentModel");
const User = require("../models/UserModel");
const PostitService = require("./postit.service");
const constants = require("../constants/constants");
const { DATABASES } = constants;

class CommentService {
    async getAllComments(pagination) {
        return await Comment.find({ 'deleted': false }).populate('user_id')
            .limit(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('postit_ref_id');
    }

    async getAllDeletedComments(pagination) {
        return await Comment.find({ 'deleted': true }).populate('user_id')
            .limit(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('postit_ref_id');
    }

    async createComment(body) {
        // console.log(body);
        let postitId = body.postit_ref_id;
        let postitInfo = await PostitService.findPostit(postitId);
        if (postitInfo) {
            //create the actual comment body
            let createdComment = await Comment.create(body);
            if (createdComment) {
                return { postit: postitInfo, comment: createdComment }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    async getAllCommentsForPostit(postitId, pagination) {

        let postitInfo = await PostitService.findPostit(postitId);
        if (postitInfo) {
            //create the actual comment body
            let allComments = await Comment.find({ 'postit_ref_id': postitId, 'deleted': false })
                .limit(pagination)
                .sort({ 'createdAt': 'desc' })
                .populate('user_id');
            if (allComments) {
                return { postit: postitInfo, comments: allComments }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    async getComment(commentId) {
        return await Comment.find({ '_id': commentId, 'deleted': false }).populate('user_id').populate('postit_ref_id');
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