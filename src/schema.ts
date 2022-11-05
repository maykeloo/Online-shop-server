import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    products: [Product!]!
    productsCount: Int
    product(slug: String!): ProductPayload!
  }

  type Mutation {
    addProduct(product: InputAddProduct!): ProductPayload!
  }

  type Product {
    id: ID!
    title: String!
    price: Int!
    slug:  String!
    description: String!
    category: String!
    image: Image!
    imageId: ID!
    longDescription: String!
    rating: Rating!
  }

  type Rating {
    rate: Float
    count: Int
    product: Product
    productId: ID
  }

  type Image {
    url:       String
    alt:       String
    width:     Int
    height:    Int
    product:   Product
    productId: ID
  }

  input ImageInput {
    url:       String
    alt:       String
    width:     Int
    height:    Int
  }

  type Errors {
    messages: String
  }

  type ProductPayload {
    product: Product
    errors: [Errors]!
  }

  input InputAddProduct {
    title: String!
    price: Int!
    description: String!
    category: String!
    longDescription: String!
    image: ImageInput!
  }
`;
