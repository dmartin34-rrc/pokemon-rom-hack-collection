import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';
import { AuthenticationError } from '../errors/errors';

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return next(new AuthenticationError('Unauthorized', 'TOKEN_INVALID'));
  }

  res.locals.userId = auth.userId;

  next();
};

export default authenticate;
