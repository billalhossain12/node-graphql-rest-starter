import { Types } from 'mongoose';
import { AppError } from '../../errors';
import { validateZodSchema } from '../../utils/validateZodSchema';
import { IBook } from './book.interface';
import { Book } from './book.model';
import { BookValidationSchemas } from './book.validation';

const getAllBooks = async () => {
  return await Book.find({}).populate('publisher');
};

const getSingleBook = async (id: Types.ObjectId) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new AppError('Book not found', 'NOT_FOUND');
  }
  return book;
};

const createBook = async (payload: IBook) => {
  const data = validateZodSchema(
    BookValidationSchemas.createBookValidationSchema,
    payload,
  );

  return await Book.create(data);
};

const updateBook = async (id: Types.ObjectId, payload: IBook) => {
  const book = await Book.findByIdAndUpdate(id, payload, { new: true });
  if (!book) {
    throw new AppError('Book not found', 'NOT_FOUND');
  }
  return book;
};

const deleteBook = async (id: Types.ObjectId) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new AppError('Book not found', 'NOT_FOUND');
  }
  return book;
};

export const BookServices = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
