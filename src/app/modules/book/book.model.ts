import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  updated: Boolean,
  publisher: {
    type: Schema.Types.ObjectId, //One to one relation
    ref: 'Publisher',
    required: true,
    unique: true,
  },
});

export const Book = model<IBook>('Book', bookSchema);
