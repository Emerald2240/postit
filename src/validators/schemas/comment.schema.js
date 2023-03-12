const joi = require("joi");

//CREATE
const commentSchema = joi.object({
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
        .min(0)
        .required()
})

const getAllPostitCommentsSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(0)
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

const searchPostitForCommentSchemaParam = joi.object({
    postitId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(0)
        .required()
})


const getAllDeletedCommentsSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(0)
        .required()
});

const getAllUserDeletedCommentsSchema = joi.object({
    userId: joi.string()
        .min(24)
        .required(),

    pagination: joi.number()
        .min(0)
        .required()
});

const getCommentUnderPostitSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required(),

    commentId: joi.string()
        .min(24)
        .required()
});

const getCommentUnderPostitUnderUserSchema = joi.object({
    postitId: joi.string()
    .min(24)
    .required(),

commentId: joi.string()
    .min(24)
    .required(),

    userId: joi.string()
    .min(24)
    .required()
})


//UPDATE
const editCommentSchema = joi.object({
    body: joi.string()
        .min(3)
        .max(250)
        .required()
});






module.exports = {getCommentUnderPostitUnderUserSchema, getCommentUnderPostitSchema, commentIdSchema, paginationSchema, postitIdSchema, commentSchema, getCommentSchema, getAllPostitCommentsSchema, searchPostitForCommentSchema, searchPostitForCommentSchemaParam, getAllDeletedCommentsSchema, getAllUserDeletedCommentsSchema, editCommentSchema };