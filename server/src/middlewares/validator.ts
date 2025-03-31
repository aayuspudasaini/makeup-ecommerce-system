import Joi from "joi";

export const signupSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: { allow: ["com", "net"] }
    }),
    password: Joi.string().required()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
});

export const loginSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: { allow: ["com", "net"] }
    }),
    password: Joi.string().required()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
});
