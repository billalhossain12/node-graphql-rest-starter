import { gql } from 'graphql-tag';

import { mergeTypeDefs } from '@graphql-tools/merge';
import { publisherSchema } from '../modules/publisher/publisher.schema';
import { bookSchema } from '../modules/book/book.schema';
import { writerSchema } from '../modules/writer/writer.schema';
import { authSchema } from '../modules/auth/auth.schema';


const baseSchema = gql`
  type Query
  type Mutation
`;

export const typeDefs = mergeTypeDefs([
  baseSchema,
  publisherSchema,
  bookSchema,
  writerSchema,
  authSchema
]);
