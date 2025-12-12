import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHistoric, storeTransaction, deleteTransaction } from '@/controllers/transaction-controller';

const transactionRouter = Router();

/**
 * @swagger
 * /transaction/historic:
 *   get:
 *     summary: Get user's transaction historic
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 */
transactionRouter
  .all('/*', authenticateToken)
  .get('/historic', getHistoric)
  /**
   * @swagger
   * /transaction/store:
   *   post:
   *     summary: Store a new transaction
   *     tags:
   *       - Transactions
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               description:
   *                 type: string
   *               amount:
   *                 type: number
   *               entity:
   *                 type: string
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transaction'
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   */
  .post('/store', storeTransaction)
  /**
   * @swagger
   * /transaction/delete/{transactionId}:
   *   delete:
   *     summary: Delete a transaction
   *     tags:
   *       - Transactions
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Ok
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Not Found
   */
  .delete('/delete/:transactionId', deleteTransaction);

export { transactionRouter };
