import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    products: [Product!]!
    productsCount: Int
    product(slug: String!): ProductPayload!
  }

  type Mutation {
    addProduct(product: InputAddProduct!): ProductPayload!
    addToFavorite(productId: ID!): FavoritePayload!
    signUp(user: SignUpInput!): UserPayload!
    signIn(user: SignInInput!): UserPayload!
  }

  type Product {
    id: ID!
    title: String!
    price: Int!
    slug: String!
    description: String!
    category: String!
    image: Image!
    imageId: ID!
    longDescription: String!
    rating: Rating!
  }

  type UserPayload {
    errors: [Errors]!
    token: String
  }

  type FavoritePayload {
    userId: Int
    productId: Int
  }

  type Rating {
    rate: Float
    count: Int
    product: Product
    productId: ID
  }

  type Image {
    url: String
    alt: String
    width: Int
    height: Int
    product: Product
    productId: ID
  }

  input ImageInput {
    url: String
    alt: String
    width: Int
    height: Int
  }

  type Errors {
    message: String
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

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;
