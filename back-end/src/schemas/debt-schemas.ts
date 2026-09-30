import Joi from 'joi';

export const debtSchema = Joi.object({
  creditor: Joi.string().required(),
  description: Joi.string().allow('', null).optional(),
  amount: Joi.number().positive().required(),
  payDate: Joi.date().allow(null, '').optional().custom((value, helpers) => {
    if (!value) return value;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    if (new Date(value) < tomorrow) {
      return helpers.message({ custom: 'payDate must be tomorrow or after' });
    }
    return value;
  }),
});

export const debtPaymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
});
