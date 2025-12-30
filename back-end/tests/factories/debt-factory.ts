import { User, Debt } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createDebt(params: Partial<User> = {}): Promise<Debt> {
  return prisma.debt.create({
    data: {
      userId: params.id || 12,
      creditor: faker.company.companyName(),
      description: faker.lorem.sentence(),
      amount: faker.datatype.number({ min: 1, max: 100000 }),
      payDate: faker.date.future(1),
      paid: false,
    },
  });
}

export function generateDebtBody() {
  return {
    creditor: faker.company.companyName(),
    description: faker.lorem.sentence(),
    amount: faker.datatype.number({ min: 1, max: 100000 }),
    payDate: faker.date.future(1),
  };
}
