import { Debt } from '@prisma/client';
import moment from 'moment';
import {
  unauthorizedError,
  invalidAmountError,
  invalidCreditorError,
  invalidPayDateError,
  notFoundError,
} from '@/errors';
import debtRepository from '@/repositories/debt-repository';
import userRepository from '@/repositories/user-repository';
import transactionService from '@/services/transaction-service';

async function checkUserIdByDebtId(userId: number, debtId: number) {
  const debt = await debtRepository.getDebtById(debtId);
  if (!debt) {
    throw unauthorizedError();
  }
  if (debt.userId !== userId) {
    throw unauthorizedError();
  }
}

async function checkUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw unauthorizedError();
  }
}

function checkPayDate(payDate: Date) {
  if (payDate !== null && !moment(payDate).isSameOrAfter(moment(), 'day')) {
    throw invalidPayDateError();
  }
}

async function getDebts(userId: number) {
  return debtRepository.getDebts(userId);
}

async function getAllDebts(userId: number) {
  return debtRepository.getAllDebts(userId);
}

async function storeDebt({ userId, creditor, description, amount, payDate }: CreateDebtParams) {
  checkUserById(userId);
  checkPayDate(payDate);
  return debtRepository.storeDebt({ userId, creditor, description, amount, payDate });
}

async function getDebtById(userId: number, debtId: number) {
  await checkUserIdByDebtId(userId, debtId);
  return debtRepository.getDebtById(debtId);
}

async function deleteDebtById(userId: number, debtId: number) {
  await checkUserIdByDebtId(userId, debtId);
  const debt = await debtRepository.getDebtById(debtId);
  return debt;
}

async function partialPayment(debt: Debt, amount: number) {
  const newAmount = debt.amount - amount;
  return debtRepository.updateDebtAmount(debt.id, newAmount);
}

async function fullPayment(debt: Debt) {
  return debtRepository.payDebt(debt.id);
}

async function debtPayment(userId: number, debtId: number, amount: number) {
  await checkUserIdByDebtId(userId, debtId);
  const debt = await debtRepository.getDebtById(debtId);

  if (!debt) {
    throw notFoundError();
  }

  let Debt;
  if (debt.amount > amount) {
    Debt = await partialPayment(debt, amount);
  } else {
    Debt = await fullPayment(debt);
  }
  const Transaction = await transactionService.storeTransaction({
    userId,
    description: `Payment of debt ${Debt.id}`,
    amount: Debt.amount,
    entity: Debt.creditor,
  });
  return { Debt, Transaction };
}

export type CreateDebtParams = Pick<Debt, 'userId' | 'creditor' | 'description' | 'amount' | 'payDate'>;

const debtService = {
  getDebts,
  getAllDebts,
  storeDebt,
  deleteDebtById,
  getDebtById,
  debtPayment,
};

export default debtService;
