import { Router } from 'express';
import { signInPost, forgotPasswordPost, resetPassword } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema, forgotPasswordSchema, resetPasswordSchema } from '@/schemas';

const authenticationRouter = Router();

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
authenticationRouter.post('/sign-in', validateBody(signInSchema), signInPost);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
authenticationRouter.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPasswordPost);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
authenticationRouter.post('/reset-password', validateBody(resetPasswordSchema), resetPassword);

export { authenticationRouter };
