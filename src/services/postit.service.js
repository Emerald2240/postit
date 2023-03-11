const Postit = require("../models/PostitModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose")

class PostItService {

    //Create User
    async createPostit(postit) {
        return await Postit.create(postit);
    }

    async findPostit(postitId){
        return await Postit.findOne({'_id':postitId, 'deleted':false}).populate('user_id');
    }

    async findDeletedPostit(postitId){
        return await Postit.findOne({'_id':postitId, 'deleted':true}).populate('user_id');
    }

    async getUserPostits(userId, pagination) {
        return await Postit.find({ 'user_id': userId, 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' }).populate('user_id');
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
                .sort({ 'createdAt': 'desc' }).populate('user_id')
        }
    }

    async updatePostit(postitId, update) {
        return await Postit.findOneAndUpdate({ '_id': postitId }, update, { new: true }).populate('user_id');
    }

    async deletePostit(postitId, loggedInUserId) {
        // return await User.findOneAndDelete({ email: email });
        let postInfo = await Postit.findOne({ '_id': postitId });
        if (postInfo) {
            if (loggedInUserId == postInfo.user_id) {
                return await Postit.findOneAndUpdate({ '_id': postitId }, { 'deleted': true }, { new: true }).populate('user_id');
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
                .sort({ 'createdAt': 'desc' }).populate('user_id')
        }
    }
}

module.exports = new PostItService();
