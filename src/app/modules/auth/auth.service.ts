/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import config from '../../config';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { AppError } from '../../errors';
import { validateZodSchema } from '../../utils/validateZodSchema';
import { AuthValidation } from './auth.validation';

const login = async (payload: TLoginUser) => {
  validateZodSchema(AuthValidation.loginValidationSchema, payload);

  // checking if the user is exist
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError('This user is not found !', 'NOT_FOUND');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError('This user is deleted !', 'FORBIDDEN');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError('This user is blocked !', 'FORBIDDEN');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError('Password does not match', 'FORBIDDEN');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('This user is not found !', 'NOT_FOUND');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError('This user is deleted !', 'FORBIDDEN');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError('This user is blocked !', 'FORBIDDEN');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError('You are not authorized !', 'UNAUTHORIZED');
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const resetPasswordFromDB = async (email: string, newPassword: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // checking if the user is exist
    const user = await User.findOne({ email })
      .select('+password')
      .session(session);
    if (!user) {
      throw new AppError('This user is not found !', 'NOT_FOUND');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError('This user is deleted !', 'FORBIDDEN');
    }

    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError('This user is blocked !', 'FORBIDDEN');
    }

    //hash the new password
    const newHashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds),
    );

    // Prevent using the same old password
    if (await User.isPasswordMatched(newPassword, user.password)) {
      throw new AppError(
        'New password must differ from the old one!',
        'BAD_REQUEST',
      );
    }

    // Update password (transaction-1)
    const updateFields = {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    };
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      updateFields,
      { session, new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new AppError(
        'Failed to update password !',
        'INTERNAL_SERVER_ERROR',
      );
    }

    await session.commitTransaction();
    return null;
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    session.endSession();
  }
};

export const AuthServices = {
  login,
  refreshToken,
  resetPasswordFromDB,
};
