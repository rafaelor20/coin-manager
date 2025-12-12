import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  getCredits,
  getAllCredits,
  getCreditById,
  storeCredit,
  removeCredit,
  creditPayment,
} from '@/controllers/credit-controller';

const creditRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Credits
 *   description: Credit management
 */

/**
 * @swagger
 * /credits:
 *   get:
 *     summary: Retrieve a list of unpaid credits for the user
 *     tags: [Credits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of credits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Credit'
 *       401:
 *         description: Unauthorized
 */
creditRouter.get('/', authenticateToken, getCredits);

/**
 * @swagger
 * /credits/all:
 *   get:
 *     summary: Retrieve a list of all credits for the user (paid and unpaid)
 *     tags: [Credits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all credits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Credit'
 *       401:
 *         description: Unauthorized
 */
creditRouter.get('/all', authenticateToken, getAllCredits);

/**
 * @swagger
 * /credits/{creditId}:
 *   get:
 *     summary: Retrieve a single credit by its ID
 *     tags: [Credits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creditId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The credit ID
 *     responses:
 *       200:
 *         description: A single credit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Credit'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Credit not found
 */
creditRouter.get('/:creditId', authenticateToken, getCreditById);

/**
 * @swagger
 * /credits/store:
 *   post:
 *     summary: Create a new credit
 *     tags: [Credits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - debtor
 *               - amount
 *             properties:
 *               debtor:
 *                 type: string
 *               amount:
 *                 type: number
 *               payDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Credit'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
creditRouter.post('/store', authenticateToken, storeCredit);

/**
 * @swagger
 * /credits/delete/{creditId}:
 *   delete:
 *     summary: Delete a credit by its ID
 *     tags: [Credits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creditId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The credit ID
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Credit not found
 */
creditRouter.delete('/delete/:creditId', authenticateToken, removeCredit);

/**
 * @swagger
 * /credits/payment/{creditId}:
 *   post:
 *     summary: Record a payment for a credit
 *     tags: [Credits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creditId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The credit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Credit not found or invalid amount
 */
creditRouter.post('/payment/:creditId', authenticateToken, creditPayment);

export { creditRouter };

/**
 * @swagger
 * components:
 *   schemas:
 *     Credit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the credit
 *         userId:
 *           type: integer
 *           description: The id of the user who owns the credit
 *         description:
 *           type: string
 *           description: A description of the credit
 *         debtor:
 *           type: string
 *           description: The person or entity who owes the money
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount of money owed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the credit was created
 *         paid:
 *           type: boolean
 *           description: Whether the credit has been paid
 *         payDate:
 *           type: string
 *           format: date-time
 *           description: The date the credit is expected to be paid
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
