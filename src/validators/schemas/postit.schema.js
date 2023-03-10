const joi = require('joi');

const createPostitSchema = joi.object({
    body: joi.string()
        .min(3)
        .max(250)//twitter is 280
        .required()
});

const getAllPostitsSchema = joi.object({
    pagination: joi.number()
        .min(1)
        .optional()
});

const getUserDeletedPostitsSchema = joi.object({
    handle: joi.string()
        .min(3)
        .required(),

    pagination: joi.number()
        .min(1)
        .optional()
});

const getExternalUsersPostitsSchema = joi.object({
    userHandle: joi.string()
        .min(3)
        .required(),

    pagination: joi.number()
        .min(1)
        .optional()
})

const postitIdSchema = joi.object({
    postitId: joi.string()
        .min(24)
        .required()
})

updatePostitSchema = joi.object({
    body: joi.string()
        .min(3)
        .max(250)//twitter is 280
        .required()
})


module.exports = { createPostitSchema, getAllPostitsSchema, getUserDeletedPostitsSchema, getExternalUsersPostitsSchema, postitIdSchema, updatePostitSchema };