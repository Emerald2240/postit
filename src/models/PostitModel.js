const { model, Schema } = require("mongoose");
const constants = require("../constants/constants");
const { USER_TYPES, DATABASES } = constants;

const PostitSchema = new Schema({
    user_id: {
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

const Postit = model(DATABASES.POSTIT, PostitSchema);
module.exports = Postit;