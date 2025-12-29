/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppError } from './AppError';

interface ErrorSource {
  path: string;
  message: string;
}

class DuplicateKeyError extends AppError {
  constructor(details: ErrorSource[]) {
    super('Duplicate value', 'DUPLICATE_KEY', details);
  }
}

export const handleDuplicateError = (err: any): DuplicateKeyError => {
  // Get the duplicate field name
  const field = Object.keys(err.keyPattern || {})[0] ?? '';

  // Try multiple strategies to get the duplicate value
  let extractedValue: string = '';

  // Strategy 1: Extract from err.message using regex
  if (err.message) {
    const match = err.message.match(/"([^"]*)"/);
    extractedValue = match?.[1] || '';
  }

  // Strategy 2: Get value from err.keyValue if available
  if (!extractedValue && err.keyValue && field) {
    extractedValue = err.keyValue[field] || '';
  }

  // Strategy 3: Fallback to a generic message
  const valueMessage = extractedValue
    ? `'${extractedValue}' already exists`
    : 'Value already exists';

  const errorSources: ErrorSource[] = [
    {
      path: field,
      message: valueMessage,
    },
  ];

  return new DuplicateKeyError(errorSources);
};
