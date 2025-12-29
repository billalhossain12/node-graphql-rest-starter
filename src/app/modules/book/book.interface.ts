import { Types } from 'mongoose';

export interface IBook {
  id: Types.ObjectId;
  title: string;
  author: string;
  year: number;
  updated: boolean;
  publisher: Types.ObjectId;
}
