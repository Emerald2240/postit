const Comment = require("../models/CommentModel");
const UserService = require("../services/user.service");
const PostitService = require("./postit.service");

class CommentService {
    async getAllComments(pagination) {
        return await Comment.find({ 'deleted': false })
            .populate('user_id')
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('postit_ref_id')
            .select('-__v ');
    }

    async getAllDeletedComments(pagination) {
        return await Comment.find({ 'deleted': true })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .populate('postit_ref_id')
            .select('-__v ');
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
                .populate('user_id')
                .select('-__v ');
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
        return await Comment.find({ '_id': commentId, 'deleted': false })
            .populate('user_id')
            .populate('postit_ref_id')
            .select('-__v ');
    }

    async searchComments(postitId, pagination, searchText) {
        let searchTextRegexed = new RegExp(searchText, 'i');
        let postitInfo = await PostitService.findPostit(postitId);
        if (postitInfo) {
            let foundComments = await Comment.find({ 'body': searchTextRegexed, 'deleted': false })
                .populate('user_id')
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' })
                .select('-__v ');
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
                .sort({ 'createdAt': 'desc' })
                .select('-__v ');
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
        let userInfo = await UserService.getUserWithUserIdUltimate(userId);
        if (userInfo) {
            let foundComments = await Comment.find({ 'deleted': true, 'user_id': userId })
                .populate('user_id')
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' })
                .select('-__v ');
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
        return await Comment.findOneAndUpdate({ '_id': commentId, 'user_id': userId, 'deleted': false }, { 'body': body }, { new: true })
            .select('-__v ');
    }

    async deleteComment(commentId, userId) {
        return await Comment.findOneAndUpdate({ '_id': commentId, 'user_id': userId }, { 'deleted': true }, { new: true })
            .select('-__v ');
    }
}

module.exports = new CommentService();