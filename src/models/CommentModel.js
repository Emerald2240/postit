const { model, Schema, SchemaType } = require("mongoose");
const constants = require("../constants/constants");
const { USER_TYPES, DATABASES } = constants;

const CommentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: DATABASES.USER,
        required: true
    },
    postit_ref_id:{
        type: Schema.Types.ObjectId,
        ref: DATABASES.POSTIT
    },
    body: {
        type: String,
        required: true
    },
    deleted:{
        type:Boolean,
        default: false,
        select: false
    }
},
    {
        timestamps: true,
    }
);

const Room = model(DATABASES.ROOM, RoomSchema);
module.exports = Room;