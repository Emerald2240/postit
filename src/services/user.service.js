const User = require("../models/UserModel");
const bcryptEncrypter = require("bcrypt");

class UserService {

    //Create new user
    async createUser(user) {

        //Add salt to hashing to make it unique
        const salt = await bcryptEncrypter.genSalt();
        const originalPassword = user.password;

        //Hash and encrypt user entered password
        const hashedPassword = await bcryptEncrypter.hash(originalPassword, salt);

        user.password = hashedPassword;

        let createdUser = await User.create(user);
        return ({
            _id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            handle: createdUser.handle,
            avatar: createdUser.avatar,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        })

    }

    async getUser(email) {
        //Makes email search filter case insensitive and a lot more broad(even if search parameter isnt completely correct.)
        let emailRegexed = new RegExp(email, 'i');

        return await User.findOne({ 'email': emailRegexed, 'deleted': false })
            .select('-__v ');
    }

    async getUserWithUserId(userId) {
        return await User.findOne({ '_id': userId, 'deleted': false })
            .select('-__v ');
    }


    //Returns everything, whether deleted or undeleted
    async getUserWithUserIdUltimate(userId) {
        return await User.findOne({ '_id': userId })
            .select('-__v ');
    }

    async getAllUsers(pagination) {
        return await User.find({ 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .select('-__v ');

        // return await User.find({'deleted': false}).select('-user_type ');
    }

    async getAllDeletedUsers(pagination) {
        return await User.find({ 'deleted': true })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .select('-__v ');
    }


    async updateUserByEmail(email, data) {

        //makes email case insensitive
        let emailRegexed = new RegExp(email, 'i');

        return await User.findOneAndUpdate({ 'email': emailRegexed }, data, { new: true })
            .select('-__v ');
    }

    async deleteUser(email) {
        return await User.findOneAndUpdate({ 'email': email }, { 'deleted': true }, { new: true })
            .select('-__v ');;
    }
}

module.exports = new UserService();