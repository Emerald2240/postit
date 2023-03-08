const joi = require("joi");

//validate user input with JOI
const loginSchema = joi.object({

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: joi.string()
        .min(5)
        .max(200)
        .required(),
});

const refreshTokenSchema = joi.object({
    token: joi.string()
    .min(50)
    .required()
});

module.exports = { loginSchema, refreshTokenSchema };
