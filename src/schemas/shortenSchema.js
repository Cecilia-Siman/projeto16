import joi from 'joi';

const shortenSchema = joi.object({
    url: joi.string().required().uri()
});

export default shortenSchema;