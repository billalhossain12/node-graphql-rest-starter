import gql from 'graphql-tag';

export const bookSchema = gql`
  type Publisher {
    id: ID!
    name: String!
    location: String!
    foundedYear: Int!
  }

  type Book {
    title: String!
    author: String!
    year: Int!
    updated: Boolean
    publisher: Publisher!
  }

  type BookPayload {
    message: String!
    data: Book
  }

  type BooksPayload {
    message: String!
    data: [Book!]!
  }

  type Query {
    Books: BooksPayload!
    SingleBook(id: ID!): BookPayload!
  }

  type Mutation {
    createBook(
      title: String!
      author: String!
      year: Int!
      updated: Boolean
      publisher: String!
    ): BookPayload!

    updateBook(
      id: ID!
      title: String
      author: String
      year: Int
      updated: Boolean
    ): BookPayload!

    deleteBook(id: ID!): BookPayload!
  }
`;
