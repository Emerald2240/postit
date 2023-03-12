const { model, Schema } = require("mongoose");
const constants = require("../constants/constants");
const { DATABASES } = constants;

const CommentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: DATABASES.USER,
        required: true
    },
    postit_ref_id: {
        type: Schema.Types.ObjectId,
        ref: DATABASES.POSTIT,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
        select: false
    }
},
    {
        timestamps: true,
    }
);

const Comment = model(DATABASES.COMMENT, CommentSchema);
module.exports = Comment;