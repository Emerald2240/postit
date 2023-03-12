const Comment = require("../models/CommentModel");
const UserService = require("../services/user.service");
const PostitService = require("./postit.service");

class CommentService {
    async getAllComments(pagination) {
        return await Comment.find({ 'deleted': false }).populate('user_id')
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('postit_ref_id');
    }

    async getAllDeletedComments(pagination) {
        return await Comment.find({ 'deleted': true }).populate('user_id')
            .limit(10)
            .skip(pagination)
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
            let allComments = await Comment.find({ 'postit_ref_id': postitId, 'deleted': false })
                .limit(10)
                .skip(pagination)
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
        let searchTextRegexed = new RegExp(searchText, 'i');
        let postitInfo = await PostitService.findPostit(postitId);
        if (postitInfo) {
            let foundComments = await Comment.find({ 'body': searchTextRegexed, 'deleted': false })
                .populate('user_id')
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' });
            if (foundComments) {
                return foundComments;
            } else {
                return null;
            }
        } else {
            return null;
        }


    }

    async getDeletedPostitComments(postitId, pagination) {
        let postitInfo = await PostitService.findPostit(postitId);
        if (postitInfo) {
            let foundComments = await Comment.find({ 'deleted': true, 'postit_ref_id': postitId })
                .populate('user_id')
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' });
            if (foundComments) {
                return foundComments;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    async getAllUserDeletedComments(userId, pagination) {
        let userInfo = await UserService.getUserWithUserId(userId);
        if (userInfo) {
            let foundComments = await Comment.find({ 'deleted': true, 'user_id': userId })
                .populate('user_id')
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' });
            if (foundComments) {
                return foundComments;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    async updateComment(commentId, body, userId) {
        return await Comment.findOneAndUpdate({ '_id': commentId, 'user_id': userId, 'deleted': false }, { 'body': body }, { new: true });
    }

    async deleteComment(commentId, userId) {
        return await Comment.findOneAndUpdate({ '_id': commentId, 'user_id': userId }, { 'deleted': true }, { new: true });
    }
}

module.exports = new CommentService();