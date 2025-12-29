import mongoose from 'mongoose';
import { AppError } from './AppError';

export interface ErrorSource {
  path: string;
  message: string;
}

class CastError extends AppError {
  constructor(details: ErrorSource[]) {
    super('Invalid ID', 'CAST_ERROR', details);
  }
}

export const handleCastError = (err: mongoose.Error.CastError): CastError => {
  const errorSources: ErrorSource[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return new CastError(errorSources);
};
