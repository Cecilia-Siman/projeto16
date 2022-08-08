import signinSchema from "../schemas/signinSchema.js";

export function signinValidator(req, res, next) {
    const user = req.body;
    const validation = signinSchema.validate(user);
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    next();
}