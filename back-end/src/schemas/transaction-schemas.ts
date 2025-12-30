import Joi from 'joi';
import { CreateTransactionParams } from '@/services/transaction-service';

export const createTransactionSchema = Joi.object<CreateTransactionParams>({
  userId: Joi.number().required(),
  description: Joi.string().min(2).required(),
  amount: Joi.number().positive().required(),
  entity: Joi.string().min(2).required(),
});
