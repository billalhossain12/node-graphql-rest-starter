import gql from 'graphql-tag';

export const writerSchema = gql`
  type Contact {
    name: String!
    email: String!
    phone: String!
  }

  type Address {
    division: String!
    district: String!
    upazila: String!
  }

  type Writer {
    id: ID!
    contact: Contact!
    address: Address!
    password: String
    gender: String!
    profileImg: String
    bloodGroup: String
    isDeleted: Boolean!
  }

  type WriterPayload {
    message: String!
    data: Writer
  }

  type WritersPayload {
    message: String!
    data: [Writer!]!
  }

  type Query {
    Writers(isDeleted: Boolean = false): WritersPayload!
    SingleWriter(id: ID!): WriterPayload!
    WritersByUser(userId: ID!): WritersPayload!
    SearchWriters(
      name: String
      email: String
      phone: String
      division: String
      district: String
      gender: String
      bloodGroup: String
    ): WritersPayload!
  }

  type Mutation {
    createWriter(
      contact: ContactInput!
      address: AddressInput!
      password: String
      gender: String!
      profileImg: String
      bloodGroup: String
    ): WriterPayload!

    updateWriter(
      id: ID!
      contact: ContactUpdateInput
      address: AddressUpdateInput
      gender: String
      profileImg: String
      bloodGroup: String
    ): WriterPayload!

    deleteWriter(id: ID!): WriterPayload!
    restoreWriter(id: ID!): WriterPayload!
    permanentDeleteWriter(id: ID!): WriterPayload!
  }

  input ContactInput {
    name: String!
    email: String!
    phone: String!
  }

  input AddressInput {
    division: String!
    district: String!
    upazila: String!
  }

  input ContactUpdateInput {
    name: String
    email: String
    phone: String
  }

  input AddressUpdateInput {
    division: String
    district: String
    upazila: String
  }
`;
