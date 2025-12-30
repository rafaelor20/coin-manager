import { Transaction } from '@prisma/client';
import { unauthorizedError, invalidAmountError, invalidDescriptionError, invalidTransactionIdError } from '@/errors';
import transactionRepository from '@/repositories/transaction-repository';
import userRepository from '@/repositories/user-repository';

async function checkUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw unauthorizedError();
  }
}

async function checkTransactionById(id: number) {
  const transaction = await transactionRepository.findById(id);
  if (!transaction) {
    throw invalidTransactionIdError();
  }
}

function isValidDescription(debtor: string) {
  if (typeof debtor !== 'string') {
    throw invalidDescriptionError();
  }
  if (debtor.trim() === '') {
    throw invalidDescriptionError();
  }
}

async function getHistoric(userId: number) {
  return transactionRepository.getHistoric(userId);
}

async function storeTransaction({ userId, description, amount, entity }: CreateTransactionParams) {
  checkUserById(userId);
  isValidDescription(description);
  amount = Number(amount);
  return transactionRepository.storeTransaction({ userId, description, amount, entity });
}

async function deleteTransaction(userId: number, transactionId: number) {
  checkUserById(userId);
  checkTransactionById(transactionId);
  return transactionRepository.deleteTransaction({ transactionId });
}

export type CreateTransactionParams = Pick<Transaction, 'userId' | 'description' | 'amount' | 'entity'>;

const transactionService = {
  getHistoric,
  storeTransaction,
  deleteTransaction,
};

export default transactionService;
