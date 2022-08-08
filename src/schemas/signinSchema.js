import joi from 'joi';

const signinSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
});

export default signinSchema;