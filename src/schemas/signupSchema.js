import joi from 'joi';

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    confirmPassword: joi.any().equal(joi.ref('password')).required().messages({ 'different password':'password does not match' }),
});

export default signupSchema;