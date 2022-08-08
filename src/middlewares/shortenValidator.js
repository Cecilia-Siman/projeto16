import shortenSchema from "../schemas/shortenSchema.js";

export function shortenValidator(req, res, next) {
    const user = req.body;
    const validation = shortenSchema.validate(user);
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    next();
}