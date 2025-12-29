import { z } from 'zod';

const uploadValidationSchema = z.object({
  file: z.string(),
});

export const UploadValidations = {
  uploadValidationSchema,
};
