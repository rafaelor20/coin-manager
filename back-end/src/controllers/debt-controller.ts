import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import debtService from '@/services/debt-service';

export async function getDebts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debts = await debtService.getDebts(userId);
    return res.status(httpStatus.OK).send(debts);
  } catch (error) {
    next(error);
  }
}

export async function getAllDebts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debts = await debtService.getAllDebts(userId);
    return res.status(httpStatus.OK).send(debts);
  } catch (error) {
    next(error);
  }
}

export async function getDebtById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debtId = Number(req.params.debtId);
    const debt = await debtService.getDebtById(userId, debtId);
    return res.status(httpStatus.OK).send(debt);
  } catch (error) {
    next(error);
  }
}

export async function storeDebt(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { creditor, description, amount, payDate } = req.body;
    const debt = await debtService.storeDebt({ userId, creditor, description, amount, payDate });
    return res.status(httpStatus.CREATED).send(debt);
  } catch (error) {
    next(error);
  }
}

export async function deleteDebt(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debtId = Number(req.params.debtId);
    const debt = await debtService.deleteDebtById(userId, debtId);
    return res.status(httpStatus.OK).send(debt);
  } catch (error) {
    if (error.message === 'No result for this search!') {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    next(error);
  }
}

export async function debtPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debtId = Number(req.params.debtId);
    const { amount } = req.body;
    const result = await debtService.debtPayment(userId, debtId, amount);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.message === 'Invalid Amount Error!') {
      return res.status(httpStatus.NOT_FOUND).send({ error: error.message });
    }

    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
    }

    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({ error: error.message });
    }
    next(error);
  }
}
