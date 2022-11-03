const Joi = require('joi');


module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(20)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            phone: Joi.string()
                .min(6)
                .max(11)
                .pattern(/^[0-9]+$/)
                .required()
        });
        const validationResult = schema.validate(req.body);
  
        if (validationResult.error) {
            return res.status(400).json({ "message": "missing required name field" });
        }
        next();
    },
    updateContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(20)
                .optional(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .optional(),
            phone: Joi.string()
                .min(6)
                .max(11)
                .pattern(/^[0-9]+$/)
                .optional()
        }).min(1);

        const validationResult = schema.validate(req.body);
  
        if (validationResult.error) {
            return res.status(400).json({ "message": "missing required name field" });
        }
        next();
    }
};