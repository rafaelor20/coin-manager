import Joi from 'joi';
import { CreateTransactionParams } from '@/services/transaction-service';

export const createTransactionSchema = Joi.object<CreateTransactionParams>({
  description: Joi.string().min(2).required(),
  amount: Joi.number().required(),
  entity: Joi.string().min(2).required(),
});
