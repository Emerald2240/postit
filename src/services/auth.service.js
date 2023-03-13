const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

class AuthService {

    //Compare user email and encrypted password
    async login(email, password) {
        let emailRegexed = new RegExp(email, 'i');

        const user = await User.findOne({ 'email': emailRegexed, 'deleted':false }, "+password +user_type")
            .select('-__v ');

        if (!user) {
            return null;
        } else {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return { _id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, user_type: user.user_type };
                } else {
                    return null;
                }
            } catch {
                return null;
            }
        }

    }

    async verifyUserExists(userId, email){
        let emailRegexed = new RegExp(email, 'i');

        const user = await User.findOne({'_id':userId, 'email': emailRegexed});
        if(user){
            return true;
        }else{
            return false;
        }
    }

}

module.exports = new AuthService();