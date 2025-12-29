import { Types } from 'mongoose';
import { AppError } from '../../errors';
import { Writer } from './writer.model';
import { IWriter } from './writer.interface';
import { authGuard } from '../../utils/authGuard';
import { ContextUser } from '../../utils/context';
import { USER_ROLE } from '../user/user.constant';

const getAllWriters = async (context: ContextUser) => {
  authGuard(context.user!, [USER_ROLE.writer, USER_ROLE.admin]);
  return await Writer.find({}).populate('user');
};

const getSingleWriter = async (id: Types.ObjectId) => {
  const writer = await Writer.findById(id);
  if (!writer) {
    throw new AppError('Writer not found', 'NOT_FOUND');
  }
  return writer;
};

const updateWriter = async (id: Types.ObjectId, payload: IWriter) => {
  const writer = await Writer.findByIdAndUpdate(id, payload, { new: true });
  if (!writer) {
    throw new AppError('Writer not found', 'NOT_FOUND');
  }
  return writer;
};

const deleteWriter = async (id: Types.ObjectId) => {
  const writer = await Writer.findByIdAndDelete(id);
  if (!writer) {
    throw new AppError('Writer not found', 'NOT_FOUND');
  }
  return writer;
};

export const WriterServices = {
  getAllWriters,
  getSingleWriter,
  updateWriter,
  deleteWriter,
};
