import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { TLoginUser } from './auth.interface';

export const authResolvers = {
  Mutation: {
    login: async (_: unknown, args: TLoginUser) => {
      const Writers = await AuthServices.login(args);
      return sendResponse(Writers, 'User is logged in successfully.');
    },
  },
};
