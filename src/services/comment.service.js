const Comment = require("../models/CommentModel");
const Postit = require("../models/PostitModel");
const UserService = require("../services/user.service");
const PostitService = require("./postit.service");

class CommentService {

    //get all comments available in the database that isnt deleted.
    async getAllComments(pagination) {
        return await Comment.find({ 'deleted': false })
            .populate('user_id')
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('postit_ref_id')
            .select('-__v ');
    }

    //get a particular comment under a particular postit
    async getCommentUnderPostit(postitId, commentId) {
        let postitInfo = await PostitService.findPostit(postitId);

        if (postitInfo) {
            let foundComment = await Comment.findOne({ '_id': commentId, 'deleted': false })
                .populate('user_id')
                .select('-__v ');
            if (foundComment) {
                return { postit: postitInfo, comment: foundComment }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    //get a particular comment under a particular postit under a particular user
    async getCommentUnderPostitUnderUser(userId, postitId, commentId) {
        let postitCheck = await Postit.findOne({ '_id': postitId, 'user_id': userId, 'deleted': false });

        if (postitCheck) {
            return await Comment.findOne({ 'user_id': userId, 'postit_ref_id': postitId, '_id': commentId, 'deleted': false })
                .populate('user_id')
                .populate('postit_ref_id')
                .select('-__v ');
        } else {
            return null
        }
    }

    //get all comments made by a particular user
    async getAllCommentsUnderUser(userId, pagination) {
        return await Comment.find({ 'user_id': userId, 'deleted': false })
            .populate('user_id')
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('postit_ref_id')
            .select('-__v ');
    }

    //get all deleted comments existing in the database. sort newest first.
    async getAllDeletedComments(pagination) {
        return await Comment.find({ 'deleted': true })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .populate('postit_ref_id')
            .select('-__v ');
    }


    //create a comment under a particular postit
    async createComment(body) {
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

    //get all comments for a particular postit
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

    //get/find a particular comment using its Id
    async getComment(commentId) {
        return await Comment.find({ '_id': commentId, 'deleted': false })
            .populate('user_id')
            .populate('postit_ref_id')
            .select('-__v ');
    }

    //search for comments with certain keywords under a particular postit
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

    //get all deleted comments under a particular postit
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

    //get all comments deleted by a particular user
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

    //update a particular comment. find it using its id
    async updateComment(commentId, body, userId) {
        return await Comment.findOneAndUpdate({ '_id': commentId, 'user_id': userId, 'deleted': false }, { 'body': body }, { new: true })
            .select('-__v ');
    }

    //delate a particular comment. find it using its id
    async deleteComment(commentId, userId) {
        return await Comment.findOneAndUpdate({ '_id': commentId, 'user_id': userId }, { 'deleted': true }, { new: true })
            .select('-__v ');
    }
}

module.exports = new CommentService();