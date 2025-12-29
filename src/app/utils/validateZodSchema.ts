import { ZodSchema } from 'zod';
import { ValidationError } from '../errors';

export function validateZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    throw new ValidationError(details);
  }

  return result.data;
}
