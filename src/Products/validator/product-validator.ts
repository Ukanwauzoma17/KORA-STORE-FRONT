import Joi from 'joi';

export const productValidator = Joi.object({
  productName: Joi.string().max(30).required(),
  description: Joi.string().min(10).max(40).required(),
  quantity: Joi.number().integer().min(0).required(),
  price:Joi.number().required()
});

export function validateProduct(data: any) {
    return productValidator.validate(data);
  }


