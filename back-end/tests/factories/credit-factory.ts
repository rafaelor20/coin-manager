import { User, Credit } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createCredit(params: Partial<User> = {}): Promise<Credit> {
  return prisma.credit.create({
    data: {
      userId: params.id,
      debtor: faker.word.preposition(),
      description: faker.lorem.sentence(),
      amount: faker.datatype.number() + 1,
      payDate: faker.date.soon(10, new Date(Date.now() + 24 * 60 * 60 * 1000)),
      paid: false,
    },
  });
}

export function generateCreditBody() {
  return {
    debtor: faker.name.findName(),
    description: faker.lorem.sentence(),
    amount: faker.datatype.number({ min: 1, max: 100000 }),
    payDate: faker.date.future(1),
  };
}
