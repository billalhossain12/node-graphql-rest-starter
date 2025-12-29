import { Types } from 'mongoose';
import { sendResponse } from '../../utils/sendResponse';
import { IBook } from './book.interface';
import { BookServices } from './book.service';

export const bookResolvers = {
  Query: {
    Books: async () => {
      const books = await BookServices.getAllBooks();
      return sendResponse(books, 'Books are retrieved successfully.');
    },
    SingleBook: async (_: unknown, args: { id: Types.ObjectId }) => {
      const book = await BookServices.getSingleBook(args.id);
      return sendResponse(book, 'Book is retrieved successfully.');
    },
  },

  Mutation: {
    createBook: async (_: unknown, args: IBook) => {
      const book = await BookServices.createBook(args);
      return sendResponse(book, 'Book is created successfully.');
    },

    updateBook: async (_: unknown, args: IBook) => {
      const book = await BookServices.updateBook(args.id, args);
      return sendResponse(book, 'Book is updated successfully.');
    },

    deleteBook: async (_: unknown, args: { id: Types.ObjectId }) => {
      const book = await BookServices.deleteBook(args.id);
      return sendResponse(book, 'Book is deleted successfully.');
    },
  },
};
