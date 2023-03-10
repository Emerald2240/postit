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
const commentIdSchema = joi.object({
    commentId: joi.string()
        .min(24)
        .required()
});

const postitIdSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required()
})

const paginationSchema = joi.object({
    pagination: joi.number()
        .min(1)
        .required()
})

const getAllPostitCommentsSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(1)
        .required()
});

const getCommentSchema = joi.object({
    commentId: joi.string()
        .min(24)
        .required()
});

const searchPostitForCommentSchema = joi.object({
    searchText: joi.string()
        .min(3)
        .max(250)
        .required(),
});


const getAllDeletedCommentsSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(1)
        .required()
});

const getAllUserDeletedCommentsSchema = joi.object({
    userId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(1)
        .required()
});


//UPDATE
const editCommentSchema = joi.object({
    body: joi.string()
        .min(3)
        .max(250)
        .required()
});



module.exports = { commentIdSchema, paginationSchema, postitIdSchema, commentSchema, getCommentSchema, getAllPostitCommentsSchema, searchPostitForCommentSchema, getAllDeletedCommentsSchema, getAllUserDeletedCommentsSchema, editCommentSchema };