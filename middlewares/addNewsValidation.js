const Joi = require("joi")

const addNewsValidation = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().min(3).max(90).required(),
        description: Joi.string().min(5).required(),

    });

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        return res.status(400).json({
            status: validationResult.error.message
        })
    }
    next();
}

module.exports = { addNewsValidation }