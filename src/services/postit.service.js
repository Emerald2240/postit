const Postit = require("../models/PostitModel");
const User = require("../models/UserModel");

class PostItService {

    //create postit
    async createPostit(postit) {
        return await Postit.create(postit);
    }

    //get all postits that are not deleted in the database
    async getAllPostits(pagination) {
        return await Postit.find({ 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .select('-__v ');
    }

    //get all deleted postits in the database
    async getAllDeletedPostits(pagination) {
        return await Postit.find({ 'deleted': true })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .select('-__v ');
    }

    //find/get a particular postit using its id
    async findPostit(postitId) {
        return await Postit.findOne({ '_id': postitId, 'deleted': false })
            .populate('user_id')
            .select('-__v ');
    }

    //find a deleted postit using its id
    async findDeletedPostit(postitId) {
        return await Postit.findOne({ '_id': postitId, 'deleted': true })
            .populate('user_id')
            .select('-__v ');
    }

    //get all postits created by a particular user
    async getUserPostits(userId, pagination) {
        return await Postit.find({ 'user_id': userId, 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .select('-__v ');
    }

    //get all postits under a particular user. find the user with his or her handle
    async getExternalUserPostits(userHandle, pagination) {
        let userInfo = await User.findOne({ 'handle': userHandle, 'deleted': false });

        if (!userInfo) {
            return null;
        } else {
            return await Postit.find({ 'user_id': userInfo._id, 'deleted': false })
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' })
                .populate('user_id')
                .select('-__v ');
        }
    }

    //update a particular postit. find it with its id
    async updatePostit(postitId, update, userId) {
        return await Postit.findOneAndUpdate({ '_id': postitId, 'user_id': userId }, update, { new: true })
            .populate('user_id')
            .select('-__v ');
    }

    //delete a particular postit. find it with its id
    async deletePostit(postitId, loggedInUserId) {
        let postInfo = await Postit.findOne({ '_id': postitId });

        if (postInfo) {
            if (loggedInUserId == postInfo.user_id) {
                return await Postit.findOneAndUpdate({ '_id': postitId }, { 'deleted': true }, { new: true })
                    .populate('user_id')
                    .select('-__v ');
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    //get all postits deleted by a particular user. find him or her using their handle
    async getUserDeletedPostits(userHandle, pagination) {
        let userInfo = await User.findOne({ 'handle': userHandle, 'deleted': false });

        if (!userInfo) {
            return null;
        } else {
            return await Postit.find({ 'user_id': userInfo._id, 'deleted': true })
                .limit(10)
                .skip(pagination)
                .sort({ 'createdAt': 'desc' })
                .populate('user_id')
                .select('-__v ');
        }
    }
}

module.exports = new PostItService();
