import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    products: [Product!]!
  }

  type Product {
    id: ID!
    title: String!
    price: Int!
    description: String!
    category: String!
    image: String!
    longDescription: String!
    rating: Rating!
  }

  type Rating {
    rate: Float
    count: Int
    product: Product
    productId: Int
  }

  type Mutation {
    addProduct(product: InputAddProduct!): AddProductPayload!
  }

  type AddProductPayload {
    product: Product
    errors: Errors
  }

  type Errors {
    messages: [String!]!
  }

  input InputAddProduct {
    title: String!
    price: Int!
    description: String!
    category: String!
    image: String!
    longDescription: String!
  }
`;
