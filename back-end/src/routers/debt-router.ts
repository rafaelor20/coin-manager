import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getDebts, getAllDebts, getDebtById, storeDebt, deleteDebt, debtPayment } from '@/controllers/debt-controller';
import { debtSchema, debtPaymentSchema } from '@/schemas/debt-schemas';

const debtRouter = Router();

/**
 * @swagger
 * /debts:
 *   get:
 *     summary: Get all debts for the authenticated user
 *     tags:
 *       - Debts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of debts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Debt'
 */
debtRouter.get('/', authenticateToken, getDebts);

/**
 * @swagger
 * /debts/all:
 *   get:
 *     summary: Get all debts for the authenticated user, including paid ones
 *     tags:
 *       - Debts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all debts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Debt'
 */
debtRouter.get('/all', authenticateToken, getAllDebts);

/**
 * @swagger
 * /debts/{debtId}:
 *   get:
 *     summary: Get a debt by its ID
 *     tags:
 *       - Debts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The debt object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Debt'
 *       404:
 *         description: Debt not found
 */
debtRouter.get('/:debtId', authenticateToken, getDebtById);

/**
 * @swagger
 * /debts/store:
 *   post:
 *     summary: Create a new debt
 *     tags:
 *       - Debts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Debt'
 *     responses:
 *       201:
 *         description: The created debt object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Debt'
 */
debtRouter.post('/store', authenticateToken, validateBody(debtSchema), storeDebt);

/**
 * @swagger
 * /debts/delete/{debtId}:
 *   delete:
 *     summary: Delete a debt by its ID
 *     tags:
 *       - Debts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted debt object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Debt'
 *       404:
 *         description: Debt not found
 */
debtRouter.delete('/delete/:debtId', authenticateToken, deleteDebt);

/**
 * @swagger
 * /debts/payment/{debtId}:
 *   post:
 *     summary: Make a payment for a debt
 *     tags:
 *       - Debts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated debt object and the transaction object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Debt:
 *                   $ref: '#/components/schemas/Debt'
 *                 Transaction:
 *                   $ref: '#/components/schemas/Transaction'
 */
debtRouter.post('/payment/:debtId', authenticateToken, validateBody(debtPaymentSchema), debtPayment);

export { debtRouter };
