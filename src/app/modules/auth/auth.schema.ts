import gql from 'graphql-tag';

export const authSchema = gql`
  type Login {
    accessToken: String!
    refreshToken: String!
    needsPasswordChange: Boolean!
  }

  type LoginPayload {
    message: String!
    data: Login
  }

  type Mutation {
    login(email: String!, password: String!): LoginPayload!
  }
`;
