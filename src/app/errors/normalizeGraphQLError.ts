/* eslint-disable no-console */
import { GraphQLError } from 'graphql';
import { AppError } from './AppError';
import { handleDuplicateError } from './handleDuplicateError';
import { handleCastError } from './handleCastError';
import mongoose from 'mongoose';

const APOLLO_USER_ERRORS = new Set([
  'BAD_USER_INPUT',
  'GRAPHQL_VALIDATION_FAILED',
  'PERSISTED_QUERY_NOT_FOUND',
  'PERSISTED_QUERY_NOT_SUPPORTED',
]);

export function normalizeGraphQLError(error: unknown, fallbackMessage: string) {
  if (!(error instanceof GraphQLError)) {
    return {
      message: fallbackMessage,
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    };
  }

  const original = error.originalError;

  /* ---------- ✅ Apollo / GraphQL user input errors ---------- */
  if (APOLLO_USER_ERRORS.has(error.extensions?.code as string)) {
    return {
      message: error.message,
      extensions: {
        code: error.extensions?.code,
      },
    };
  }

  // ✅ MongoDB CastError (invalid ObjectId)
  if (original instanceof mongoose.Error.CastError) {
    const castError = handleCastError(original);

    return {
      message: castError.message,
      extensions: {
        code: castError.code,
        details: castError.details,
      },
    };
  }

  /* ---------- Mongo duplicate key ---------- */
  if (original && 'code' in original && original.code === 11000) {
    const duplicateError = handleDuplicateError(original);

    return {
      message: duplicateError.message,
      extensions: {
        code: duplicateError.code,
        details: duplicateError.details,
      },
    };
  }

  /* ---------- App / Validation ---------- */
  if (original instanceof AppError) {
    return {
      message: original.message,
      extensions: {
        code: original.code,
        details: original.details,
      },
    };
  }

  /* ---------- Unknown ---------- */
  console.error('Unhandled error:', error);

  return {
    message: fallbackMessage,
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
  };
}
