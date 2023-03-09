const Postit = require("../models/PostitModel");

class PostItService{
    
    //Create User
    async createPostit(postit){
            return await Postit.create(postit);
    }
}

module.exports = new PostItService();
