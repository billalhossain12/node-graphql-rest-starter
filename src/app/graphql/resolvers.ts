import { mergeResolvers } from '@graphql-tools/merge';
import { bookResolvers } from '../modules/book/book.resolver';
import { publisherResolvers } from '../modules/publisher/publisher.resolver';
import { writerResolvers } from '../modules/writer/writer.resolver';
import { authResolvers } from '../modules/auth/auth.resolver';

export const resolvers = mergeResolvers([
  bookResolvers,
  publisherResolvers,
  writerResolvers,
  authResolvers,
]);
