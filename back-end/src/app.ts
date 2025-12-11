import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';
import { usersRouter, authenticationRouter, transactionRouter, debtRouter, creditRouter } from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json()) // This line is causing the error
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/transactions', transactionRouter)
  .use('/debts', debtRouter)
  .use('/credits', creditRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
