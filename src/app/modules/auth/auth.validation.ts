import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

const refreshTokenValidationSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});

const resetPasswordValidationSchema = z.object({
  email: z.string({
    required_error: 'Email is required!',
  }),
  newPassword: z.string({
    required_error: 'New password is required!',
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
};
