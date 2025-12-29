/* eslint-disable @typescript-eslint/no-explicit-any */
// app/utils/context.ts
import jwt from 'jsonwebtoken';
import config from '../config';

import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { AppError } from '../errors';

export interface ContextUser {
  user?: {
    userId: string;
    role: string;
    iat: number;
  } | null;
}

export const buildContext = async ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<ContextUser> => {
  const token = req.headers.authorization;

  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret!) as any;

    return {
      user: {
        userId: decoded.userId,
        role: decoded.role,
        iat: decoded.iat,
      },
    };
  } catch {
    throw new AppError('You are not authorized', 'UNAUTHORIZED');
  }
};
