import { Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface IContact {
  name: string;
  email: string;
  phone: string;
}

export interface IAddress {
  division: string;
  district: string;
  upazila: string;
}

export interface IWriter {
  id: Types.ObjectId;
  contact: IContact;
  address: IAddress;
  password: string;
  user: Types.ObjectId;
  gender: TGender;
  profileImg?: string;
  bloodGroup?: TBloodGroup;
  isDeleted: boolean;
}
