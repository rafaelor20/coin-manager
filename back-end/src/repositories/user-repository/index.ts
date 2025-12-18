import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findById(id: number, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      id,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findByToken(token: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindFirstArgs = {
    where: {
      token,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findFirst(params);
}

async function update(id: number, data: Prisma.UserUncheckedUpdateInput) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
  findById,
  update,
  findByToken,
};

export default userRepository;
