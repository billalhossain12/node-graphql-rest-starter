import gql from 'graphql-tag';

export const publisherSchema = gql`
  type Publisher {
    id: ID!
    name: String!
    location: String!
    foundedYear: Int!
  }

  type Query {
    getAllPublishers: [Publisher!]!
    getSinglePublisher(id: ID!): Publisher
  }

  type Mutation {
    createPublisher(
      name: String!
      location: String!
      foundedYear: Int!
    ): Publisher
  }
`;
