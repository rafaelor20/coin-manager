import { Credit } from '@prisma/client';
import { unauthorizedError, invalidCreditIdError } from '@/errors';
import creditRepository from '@/repositories/credit-repository';
import userRepository from '@/repositories/user-repository';
import transactionService from '@/services/transaction-service';

function checkCreditIdIsNumber(value: any) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw invalidCreditIdError();
  }
}

async function checkUserIdByCreditId(userId: number, creditId: number) {
  const credit = await creditRepository.getCreditById(creditId);
  if (!credit) {
    throw invalidCreditIdError();
  }
  if (credit.userId !== userId) {
    throw unauthorizedError();
  }
}

async function checkUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw unauthorizedError();
  }
}

async function getCredits(userId: number) {
  return creditRepository.getCredits(userId);
}

async function getAllCredits(userId: number) {
  return creditRepository.getAllCredits(userId);
}

async function storeCredit({ userId, description, debtor, amount, payDate }: CreateCreditParams) {
  checkUserById(userId);
  amount = Number(amount);
  return creditRepository.storeCredit({ userId, debtor, amount, payDate, description });
}

async function getCreditById(userId: number, creditId: number) {
  await checkUserIdByCreditId(userId, creditId);
  const credit = await creditRepository.getCreditById(creditId);
  return credit;
}

async function removeCredit(userId: number, creditId: number) {
  await checkUserIdByCreditId(userId, creditId);
  return creditRepository.removeCreditById(creditId);
}

async function partialPayment(credit: Credit, amount: number) {
  const newAmount = credit.amount - amount;
  return creditRepository.updateCreditAmount(credit.id, newAmount);
}

async function fullPayment(credit: Credit) {
  return creditRepository.payCredit(credit.id);
}

async function creditPayment(userId: number, creditId: number, payment: number) {
  checkCreditIdIsNumber(creditId);
  const credit = await getCreditById(userId, creditId);
  let Credit;
  if (credit.amount > payment) {
    Credit = await partialPayment(credit, payment);
  } else {
    Credit = await fullPayment(credit);
  }
  const Transaction = await transactionService.storeTransaction({
    userId,
    description: `Payment of credit ${Credit.id}`,
    amount: Credit.amount,
    entity: Credit.debtor,
  });
  return { Credit, Transaction };
}

export type CreateCreditParams = Pick<Credit, 'userId' | 'debtor' | 'amount' | 'payDate' | 'description'>;

const creditService = {
  getCredits,
  getAllCredits,
  storeCredit,
  getCreditById,
  removeCredit,
  creditPayment,
};

export default creditService;
