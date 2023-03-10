const joi = require("joi");

//CREATE
const commentSchema = joi.object({
    postitId: joi.string()
    .min(24)
    .required(),
    
    body: joi.string()
    .min(3)
    .max(250)
    .required()
});

//READ
const getCommentSchema = joi.object({
    commentId: joi.string()
    .min(24)
    .required()
});

const getAllPostitCommentsSchema = joi.object({
    postitId: joi.string()
    .min(24)
    .required()
});

const searchPostitForCommentSchema = joi.object({
    searchText: joi.string()
    .min(3)
    .max(250)
    .required()
});

const getAllDeletedCommentsSchema = joi.object({});


//UPDATE
const editCommentSchema = joi.object({
    commentId: joi.string()
    .min(24)
    .required(),
    
    body: joi.string()
    .min(3)
    .max(250)
    .required()
});


//DELETE
const deleteCommentSchema = joi.object({
    commentId: joi.string()
    .min(24)
    .required()
})

module.exports = { commentSchema, getCommentSchema, getAllPostitCommentsSchema, searchPostitForCommentSchema, getAllDeletedCommentsSchema, editCommentSchema, deleteCommentSchema };