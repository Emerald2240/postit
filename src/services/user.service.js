const User = require("../models/UserModel");
const bcryptEncrypter = require("bcrypt");

class UserService {

    //create new user
    async createUser(user) {

        //add salt to hashing to make it unique
        const salt = await bcryptEncrypter.genSalt();
        const originalPassword = user.password;

        //hash and encrypt user entered password
        const hashedPassword = await bcryptEncrypter.hash(originalPassword, salt);

        user.password = hashedPassword;

        //checks for a user with either the email or the handle, if it finds a match, it returns an error
        let userCheck = await User.findOne()
            .and([
                {
                    $or: [
                        { 'email': user.email },
                        { 'handle': user.handle },
                    ]
                }
            ]);

        if (userCheck) {
            return { error: 'Email or Handle already exists' }
        }

        //create user
        let createdUser = await User.create(user);
        return ({
            _id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            handle: createdUser.handle,
            avatar: createdUser.avatar,
            avatar_wrapped: createdUser.avatar_wrapped,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        })

    }

    //get user with email address
    async getUser(email) {
        //Makes email search filter case insensitive and a lot more broad(even if search parameter isnt completely correct.)
        let emailRegexed = new RegExp(email, 'i');

        return await User.findOne({ 'email': emailRegexed, 'deleted': false })
            .select('-__v ');
    }

    //get a user with mongoose assigned id
    async getUserWithUserId(userId) {
        return await User.findOne({ '_id': userId, 'deleted': false })
            .select('-__v ');
    }

    //get a user with their handle
    async getUserWithHandle(userHandle) {
        return await User.findOne({ 'handle': userHandle, 'deleted': false })
            .select('-__v ');
    }

    //Returns everything, whether deleted or undeleted
    async getUserWithUserIdUltimate(userId) {
        return await User.findOne({ '_id': userId })
            .select('-__v ');
    }

    //get all users available in the database
    async getAllUsers(pagination) {
        return await User.find({ 'deleted': false })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .select('-__v ');

        // return await User.find({'deleted': false}).select('-user_type ');
    }

    //get all user who deactivated their accounts
    async getAllDeletedUsers(pagination) {
        return await User.find({ 'deleted': true })
            .limit(10)
            .skip(pagination)
            .sort({ 'createdAt': 'desc' })
            .select('-__v ');
    }

    //update a particular user. find them with their email address
    async updateUserByEmail(email, data) {

        //makes email case insensitive
        let emailRegexed = new RegExp(email, 'i');

        return await User.findOneAndUpdate({ 'email': emailRegexed }, data, { new: true })
            .select('-__v ');
    }

    //delete a particular user. find them with their email address
    async deleteUser(email) {
        return await User.findOneAndUpdate({ 'email': email }, { 'deleted': true }, { new: true })
            .select('-__v ');;
    }
}

module.exports = new UserService();