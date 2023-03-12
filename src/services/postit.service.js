const Postit = require("../models/PostitModel");
const User = require("../models/UserModel");

class PostItService {

    //Create User
    async createPostit(postit) {
        return await Postit.create(postit);
    }

    async getAllPostits(pagination) {
        return await Postit.find({ 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .select('-__v ');
    }

    async getAllDeletedPostits(pagination) {
        return await Postit.find({ 'deleted': true })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .select('-__v ');
    }

    async findPostit(postitId) {
        return await Postit.findOne({ '_id': postitId, 'deleted': false })
            .populate('user_id')
            .select('-__v ');
    }

    async findDeletedPostit(postitId) {
        return await Postit.findOne({ '_id': postitId, 'deleted': true })
            .populate('user_id')
            .select('-__v ');
    }

    async getUserPostits(userId, pagination) {
        return await Postit.find({ 'user_id': userId, 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .populate('user_id')
            .select('-__v ');
    }

    async getExternalUserPostits(userHandle, pagination) {
        let userInfo = await User.findOne({ 'handle': userHandle, 'deleted': false });
        // console.log(userInfo);
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

    async updatePostit(postitId, update, userId) {
        return await Postit.findOneAndUpdate({ '_id': postitId, 'user_id': userId }, update, { new: true })
            .populate('user_id')
            .select('-__v ');
    }

    async deletePostit(postitId, loggedInUserId) {
        // return await User.findOneAndDelete({ email: email });
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

    async getUserDeletedPostits(userHandle, pagination) {
        let userInfo = await User.findOne({ 'handle': userHandle, 'deleted': false });
        // console.log(userInfo);
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
