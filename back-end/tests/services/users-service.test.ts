import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from '@/services/users-service';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';

jest.mock('@/repositories/user-repository');
jest.mock('@/repositories/session-repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('userService.createUser', () => {
  const mockUser = {
    id: 1,
    email: faker.internet.email(),
    password: 'hashedPassword',
    createdAt: new Date(),
    amount: 0,
    token: '',
  };

  const validParams = {
    email: mockUser.email,
    password: 'plainPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(userRepository, 'create').mockResolvedValue({
      id: mockUser.id,
      email: validParams.email,
      password: 'hashedPassword',
      createdAt: new Date(),
      amount: 0,
      token: '',
    });
  });

  it('should create a user with valid params', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never);

    const result = await userService.createUser(validParams);

    expect(result).toEqual({
      email: validParams.email,
      id: mockUser.id,
      createdAt: expect.any(Date),
      amount: mockUser.amount,
      password: mockUser.password,
      token: mockUser.token,
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParams.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(validParams.password, 12);
    expect(userRepository.create).toHaveBeenCalledWith({
      email: validParams.email,
    });
  });
});
