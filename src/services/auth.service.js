const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

class AuthService {

    //compare user email and encrypted password with database entries
    async login(email, password) {
        let emailRegexed = new RegExp(email, 'i');

        const user = await User.findOne({ 'email': emailRegexed, 'deleted': false }, "+password +user_type")
            .select('-__v ');

        //if user isnt found return null, if found compare credentials
        if (!user) {
            return null;
        } else {
            try {
                if (await bcrypt.compare(password, user.password)) {

                    //the functions above requires fetching of sensitive data like password, we cannot return that to the user, so we rebuild the data before replying.
                    return { _id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, user_type: user.user_type };
                } else {
                    return null;
                }
            } catch {
                return null;
            }
        }

    }

    //check if user exists in database. return true or false.
    async verifyUserExists(userId, email) {
        let emailRegexed = new RegExp(email, 'i');

        const user = await User.findOne({ '_id': userId, 'email': emailRegexed });
        if (user) {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = new AuthService();