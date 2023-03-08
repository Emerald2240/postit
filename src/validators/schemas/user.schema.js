const joi = require("joi");

const signUpSchema = joi.object({
    first_name: joi.string()
        .min(3)
        .max(200)
        .required(),

    last_name: joi.string()
        .min(3)
        .max(200)
        .required(),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: joi.string()
        .min(5)
        .max(100)
        .required(),

    handle: joi.string()
        .min(5)
        .max(100)
        .required(),

    user_type: joi.string()
        .min(4)//user
        .max(5)//admin
        .required(),

});

const updateUserSchema = joi.object({
    first_name: joi.string()
        .min(3)
        .max(200),

    last_name: joi.string()
        .min(3)
        .max(200),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    handle: joi.string()
        .min(5)
        .max(100)
});

const emailSchema = joi.object({
    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

module.exports = { signUpSchema, emailSchema, updateUserSchema };
