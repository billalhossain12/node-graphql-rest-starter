import { z } from 'zod';
import { BloodGroup, Gender } from './writer.constant';

const contactValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.',
  }),
  email: z
    .string({
      required_error: 'Email is required.',
      invalid_type_error: 'Email must be a string.',
    })
    .email({ message: 'Invalid email address.' }),
  phone: z.string({
    required_error: 'Phone number is required.',
    invalid_type_error: 'Phone must be a string.',
  }),
});

const addressValidationSchema = z.object({
  division: z.string({ required_error: 'Division is required.' }),
  district: z.string({ required_error: 'District is required.' }),
  upazila: z.string({ required_error: 'Upazila is required.' }),
});

const createWriterValidationSchema = z.object({
  contact: contactValidationSchema,
  address: addressValidationSchema,
  password: z.string().optional(),
  gender: z.enum([...Gender] as [string, ...string[]], {
    required_error: 'Gender is required.',
    invalid_type_error: 'Gender is not valid.',
  }),
  bloodGroup: z
    .enum([...BloodGroup] as [string, ...string[]], {
      invalid_type_error: 'Blood group is not valid.',
    })
    .optional(),
  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string.',
    })
    .optional(),
});

const updateWriterValidationSchema = z.object({
  contact: z
    .object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  address: z
    .object({
      division: z.string().optional(),
      district: z.string().optional(),
      upazila: z.string().optional(),
    })
    .optional(),
  gender: z
    .enum([...Gender] as [string, ...string[]], {
      invalid_type_error: 'Gender is not valid.',
    })
    .optional(),
  bloodGroup: z
    .enum([...BloodGroup] as [string, ...string[]], {
      invalid_type_error: 'Blood group is not valid.',
    })
    .optional(),
  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string.',
    })
    .optional(),
});

export const WriterValidationSchemas = {
  createWriterValidationSchema,
  updateWriterValidationSchema,
};
