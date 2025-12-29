import { model, Schema } from 'mongoose';
import { IAddress, IContact, IWriter } from './writer.interface';
import { BloodGroup, Gender } from './writer.constant';

const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
});

const addressSchema = new Schema<IAddress>({
  division: {
    type: String,
    trim: true,
    required: true,
  },
  district: {
    type: String,
    trim: true,
    required: true,
  },
  upazila: {
    type: String,
    trim: true,
    required: true,
  },
});

const writerSchema = new Schema<IWriter>(
  {
    contact: contactSchema,
    address: addressSchema,
    password: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    gender: {
      type: String,
      enum: Gender,
    },
    bloodGroup: {
      type: String,
      enum: BloodGroup,
    },
    profileImg: {
      type: String,
      trim: true,
      default: 'https://i.ibb.co.com/S3mypps/member-1.png',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Writer = model<IWriter>('Writer', writerSchema);
