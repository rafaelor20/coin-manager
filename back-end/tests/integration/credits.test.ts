import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser, createCredit, generateCreditBody } from '../factories';
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

describe('GET /credits', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/credits');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/credits').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/credits').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      const creditBody = generateCreditBody();
      const creditBody2 = generateCreditBody();

      for (let i = 0; i < 10; i++) {
        await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(creditBody);
      }

      for (let i = 0; i < 10; i++) {
        await server.post('/credits/store').set('Authorization', `Bearer ${token2}`).send(creditBody2);
      }

      const response = await server.get('/credits').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            description: expect.any(String),
            debtor: expect.any(String),
            amount: expect.any(Number),
            paid: false,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          }),
        ]),
      );
    });
  });
});

describe('GET /credits', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/credits/all');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/credits/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/credits/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      const creditBody = generateCreditBody();
      const creditBody2 = generateCreditBody();

      for (let i = 0; i < 10; i++) {
        await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(creditBody);
      }

      for (let i = 0; i < 10; i++) {
        await server.post('/credits/store').set('Authorization', `Bearer ${token2}`).send(creditBody2);
      }

      const response = await server.get('/credits/all').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            description: expect.any(String),
            debtor: expect.any(String),
            amount: expect.any(Number),
            paid: expect.any(Boolean),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          }),
        ]),
      );
    });
  });
});

describe('POST /credits/store', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/credits/store');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = generateCreditBody();
      credit.amount = undefined;
      const body = credit;
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if payDate is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = generateCreditBody();
      credit.payDate = faker.date.past();
      const body = credit;
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 and create credit', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = generateCreditBody();
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: user.id,
        description: body.description,
        debtor: body.debtor,
        amount: body.amount,
        paid: false,
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.any(String),
      });
    });
  });
});

describe('GET /credits/:creditId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/credits/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/credits/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/credits/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return credit', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);

      const response = await server.get(`/credits/${credit.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: credit.id,
        userId: credit.userId,
        description: credit.description,
        debtor: credit.debtor,
        amount: credit.amount,
        paid: credit.paid,
        createdAt: expect.any(String),
        payDate: expect.any(String),
      });
    });
  });
});

describe('DELETE /credits/delete/:creditId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/credits/delete/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/credits/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/credits/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and delete credit', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);
      const response = await server.delete(`/credits/delete/${credit.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: credit.userId,
        description: credit.description,
        debtor: credit.debtor,
        amount: credit.amount,
        paid: credit.paid,
        createdAt: expect.any(String),
        payDate: expect.any(String),
      });
    });
  });
});

describe('POST /credits/payment:creditId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const paymentBody = {
      userId: 1,
      amount: 11,
    };
    const response = await server.post('/credits/payment/1').send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const paymentBody = {
      userId: 1,
      amount: 11,
    };
    const response = await server.post('/credits/payment/1').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const paymentBody = {
      userId: userWithoutSession.id,
      amount: 11,
    };

    const response = await server.post('/credits/payment/1').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    describe('when credit is not found', () => {
      it('should respond with status 404', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const paymentBody = {
          userId: user.id,
          creditId: 1,
          amount: 11,
        };
        const response = await server
          .post('/credits/payment/1')
          .set('Authorization', `Bearer ${token}`)
          .send(paymentBody);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });
    });

    describe('when amount is not enough to pay', () => {
      it('should update the owned amount, register the transaction and respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const credit = await createCredit(user);
        const paymentBody = {
          userId: user.id,
          creditId: credit.id,
          amount: credit.amount - 1,
        };
        const response = await server
          .post(`/credits/payment/${credit.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(paymentBody);

        expect(response.status).toBe(httpStatus.OK);
        const { Credit, Transaction } = response.body;
        expect(Credit).toEqual({
          id: expect.any(Number),
          userId: credit.userId,
          debtor: credit.debtor,
          description: credit.description,
          amount: credit.amount - paymentBody.amount,
          paid: false,
          createdAt: expect.any(String),
          payDate: expect.any(String),
        });
        expect(Transaction).toEqual({
          id: expect.any(Number),
          userId: user.id,
          description: `Payment of credit ${Credit.id}`,
          amount: credit.amount - paymentBody.amount,
          entity: credit.debtor,
          createdAt: expect.any(String),
        });
      });
    });
    describe('when amount is enough to pay', () => {
      it('should update the owned amount, register the transaction and respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const credit = await createCredit(user);
        const paymentBody = {
          userId: user.id,
          creditId: credit.id,
          amount: credit.amount,
        };
        const response = await server
          .post(`/credits/payment/${credit.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(paymentBody);

        expect(response.status).toBe(httpStatus.OK);
        const creditId = expect.any(Number);
        const { Credit, Transaction } = response.body;
        expect(Credit).toEqual({
          id: creditId,
          userId: credit.userId,
          debtor: credit.debtor,
          description: credit.description,
          amount: credit.amount,
          paid: true,
          createdAt: expect.any(String),
          payDate: expect.any(String),
        });
        expect(Transaction).toEqual({
          id: expect.any(Number),
          userId: user.id,
          description: `Payment of credit ${Credit.id}`,
          amount: credit.amount,
          entity: credit.debtor,
          createdAt: expect.any(String),
        });
      });
    });
  });
});
