import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService, { SignInParams } from '@/services/authentication-service';

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).json({
      token: result.token,
      id: result.user.id,
      email: result.user.email,
    });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function forgotPasswordPost(req: Request, res: Response) {
  const { email } = req.body as { email: string };

  try {
    await authenticationService.forgotPassword(email);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as { token: string; password: string };
  try {
    await authenticationService.resetPassword(token, password);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
