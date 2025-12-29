import { Types } from 'mongoose';
import { z } from 'zod';

const createBookValidationSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.number({
    required_error: 'Year is required.',
    invalid_type_error: 'Year must be number.',
  }),
  updated: z.string().optional(),
  publisher: z.string().refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  }),
});

export const BookValidationSchemas = {
  createBookValidationSchema,
};
