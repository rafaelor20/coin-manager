import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser, createDebt, generateDebtBody } from '../factories';
import app, { init, close } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe('GET /debts', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/debts');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/debts').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/debts').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      const debtBody = generateDebtBody();
      const debtBody2 = generateDebtBody();

      for (let i = 0; i < 10; i++) {
        await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(debtBody);
      }

      for (let i = 0; i < 10; i++) {
        await server.post('/debts/store').set('Authorization', `Bearer ${token2}`).send(debtBody2);
      }

      const response = await server.get('/debts').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            creditor: expect.any(String),
            description: expect.any(String),
            amount: expect.any(Number),
            paid: false,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.any(String),
          }),
        ]),
      );
    });
  });
});

describe('GET /debts/all', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/debts/all');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/debts/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/debts/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      const debtBody = generateDebtBody();
      const debtBody2 = generateDebtBody();

      for (let i = 0; i < 10; i++) {
        await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(debtBody);
      }

      for (let i = 0; i < 10; i++) {
        await server.post('/debts/store').set('Authorization', `Bearer ${token2}`).send(debtBody2);
      }

      const response = await server.get('/debts/all').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            creditor: expect.any(String),
            description: expect.any(String),
            amount: expect.any(Number),
            paid: expect.any(Boolean),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.any(String),
          }),
        ]),
      );
    });
  });
});

describe('GET /debts/:debtId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/debts/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/debts/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/debts/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return debt', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);

      const response = await server.get(`/debts/${debt.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: debt.id,
        userId: debt.userId,
        creditor: debt.creditor,
        description: debt.description,
        amount: debt.amount,
        paid: false,
        createdAt: expect.any(String),
        payDate: expect.any(String),
      });
    });
  });
});

describe('POST /debts/store', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/debts/store');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = generateDebtBody();
      debt.amount = undefined;
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = generateDebtBody();
      debt.payDate = faker.date.past();
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if creditor is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = generateDebtBody();
      debt.creditor = '';
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 and create debt', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = generateDebtBody();
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        creditor: body.creditor,
        description: body.description,
        amount: body.amount,
        paid: false,
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.any(String),
      });
    });
  });
});

describe('DELETE /debts/delete/:debtId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/debts/delete/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/debts/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/debts/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and delete debt', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);
      const response = await server.delete(`/debts/delete/${debt.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: debt.userId,
        creditor: debt.creditor,
        description: debt.description,
        amount: debt.amount,
        paid: false,
        createdAt: expect.any(String),
        payDate: expect.any(String),
      });
    });
  });
});

describe('POST /debts/payment/:debtId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const paymentBody = {
      userId: 1,
      payment: 11,
    };
    const response = await server.post('/debts/payment/1').send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const paymentBody = {
      userId: 1,
      payment: 11,
    };
    const response = await server.post('/debts/payment/1').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const paymentBody = {
      userId: userWithoutSession.id,
      payment: 11,
    };

    const response = await server.post('/debts/payment/1').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    describe('when debt is not found', () => {
      it('should respond with status 404', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const paymentBody = {
          amount: 11,
        };
        const response = await server
          .post('/debts/payment/10')
          .set('Authorization', `Bearer ${token}`)
          .send(paymentBody);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    });

    describe('when amount is not enough to pay', () => {
      it('should update the owned amount, register the transaction and respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const debt = await createDebt(user);
        await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(generateDebtBody());
        const paymentBody = {
          amount: debt.amount - 1,
        };
        const response = await server
          .post(`/debts/payment/${debt.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(paymentBody);

        expect(response.status).toBe(httpStatus.OK);
        const { Debt, Transaction } = response.body;
        expect(Debt).toEqual({
          id: expect.any(Number),
          userId: debt.userId,
          creditor: debt.creditor,
          description: debt.description,
          amount: debt.amount - paymentBody.amount,
          paid: false,
          createdAt: expect.any(String),
          payDate: expect.any(String),
        });
        expect(Transaction).toEqual({
          id: expect.any(Number),
          userId: user.id,
          description: `Payment of debt ${Debt.id}`,
          amount: paymentBody.amount * -1,
          entity: debt.creditor,
          createdAt: expect.any(String),
        });
      });
    });
    describe('when amount is enough to pay', () => {
      it('should update the owned amount, register the transaction and respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const debt = await createDebt(user);
        await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(generateDebtBody());
        const paymentBody = {
          amount: debt.amount,
        };
        const response = await server
          .post(`/debts/payment/${debt.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(paymentBody);

        expect(response.status).toBe(httpStatus.OK);
        const { Debt, Transaction } = response.body;
        expect(Debt).toEqual({
          id: expect.any(Number),
          userId: debt.userId,
          creditor: debt.creditor,
          description: debt.description,
          amount: debt.amount,
          paid: true,
          createdAt: expect.any(String),
          payDate: expect.any(String),
        });
        expect(Transaction).toEqual({
          id: expect.any(Number),
          userId: user.id,
          description: `Payment of debt ${Debt.id}`,
          amount: paymentBody.amount * -1,
          entity: debt.creditor,
          createdAt: expect.any(String),
        });
      });
    });
  });
});
