//signup é cadastro

import signupSchema from "../schemas/signupSchema.js";

export function signupValidator(req, res, next) {
    const user = req.body;
    const validation = signupSchema.validate(user);
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    next();
}