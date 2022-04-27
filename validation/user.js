const Joi = require('joi');
exports.userValidationCreate = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(255).required().pattern(/^[a-zA-Z\s]+$/),
        last_name: Joi.string().min(2).max(255).pattern(/^[a-zA-Z\s]+$/),
        email: Joi.string().min(4).max(255).required().email(),
        phone: Joi.string().min(4).max(20).required().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
        password: Joi.string().min(3).max(40).required(),
    })
    return schema.validate(data);
}

exports.userValidationGet = (data) => {
    const schema = Joi.object({
        id: Joi.number().min(1).max(100000).positive(),
    })
    return schema.validate(data);
}
exports.userValidationLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(3).max(40).required(),
    })
    return schema.validate(data);
}

