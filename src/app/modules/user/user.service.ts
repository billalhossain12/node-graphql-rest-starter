/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';
import { IWriter } from '../writer/writer.interface';
import config from '../../config';
import { AppError } from '../../errors';
import { Writer } from '../writer/writer.model';
import { validateZodSchema } from '../../utils/validateZodSchema';
import { WriterValidationSchemas } from '../writer/writer.validation';

const createWriter = async (payload: IWriter) => {
  validateZodSchema(
    WriterValidationSchemas.createWriterValidationSchema,
    payload,
  );

  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = payload.password || (config.default_password as string);

  //set writer role
  userData.role = 'writer';

  //set writer email
  userData.email = payload.contact.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // if (file) {
    //   const imageName = `${payload?.contact?.name}`;
    //   const path = file?.path;
    //   //send image to cloudinary
    // }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a writer
    if (!newUser.length) {
      throw new AppError('Failed to create writer', 'BAD_REQUEST');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a writer (transaction-2)
    const newWriter = await Writer.create([payload], { session });

    if (!newWriter.length) {
      throw new AppError('Failed to create writer', 'BAD_REQUEST');
    }

    await session.commitTransaction();
    await session.endSession();

    return newWriter;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: Types.ObjectId, role: string) => {
  let result = null;
  if (role === 'writer') {
    result = await Writer.findOne({ user: userId });
  }
  if (role === 'superAdmin') {
    result = await User.findById(userId);
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  getMe,
  changeStatus,
  createWriter,
};
