import { ApolloServer, gql } from "apollo-server-express";
import { Query } from "./query/index";
import { typeDefs } from "./schema";
import { Mutation, Product } from "./resolvers";
import { PrismaClient, Prisma } from "@prisma/client";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const startApolloServer = async (app: any, httpServer: any) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Product,
    },
    context: async (): Promise<Context> => {
      return {
        prisma,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
