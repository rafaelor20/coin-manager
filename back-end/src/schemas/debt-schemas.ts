import Joi from 'joi';

export const debtSchema = Joi.object({
  creditor: Joi.string().required(),
  description: Joi.string(),
  amount: Joi.number().required(),
  payDate: Joi.date(),
});

export const debtPaymentSchema = Joi.object({
  amount: Joi.number().required(),
});
