import { Types } from 'mongoose';
import { sendResponse } from '../../utils/sendResponse';
import { WriterServices } from './writer.service';
import { IWriter } from './writer.interface';
import { UserServices } from '../user/user.service';
import { ContextUser } from '../../utils/context';

export const writerResolvers = {
  Query: {
    Writers: async (_: unknown, __: unknown, context: ContextUser) => {
      const Writers = await WriterServices.getAllWriters(context);
      return sendResponse(Writers, 'Writers are retrieved successfully.');
    },
    SingleWriter: async (_: unknown, args: { id: Types.ObjectId }) => {
      const Writer = await WriterServices.getSingleWriter(args.id);
      return sendResponse(Writer, 'Writer is retrieved successfully.');
    },
  },

  Mutation: {
    createWriter: async (_: unknown, args: IWriter) => {
      const Writer = await UserServices.createWriter(args);
      return sendResponse(Writer, 'Writer is created successfully.');
    },

    updateWriter: async (_: unknown, args: IWriter) => {
      const Writer = await WriterServices.updateWriter(args.id, args);
      return sendResponse(Writer, 'Writer is updated successfully.');
    },

    deleteWriter: async (_: unknown, args: { id: Types.ObjectId }) => {
      const Writer = await WriterServices.deleteWriter(args.id);
      return sendResponse(Writer, 'Writer is deleted successfully.');
    },
  },
};
