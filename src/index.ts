import { ApolloServer } from "apollo-server";
import { Query } from './query/index'
import { typeDefs } from "./schema";
import { Mutation, Product } from './resolvers'
import { PrismaClient, Prisma } from '@prisma/client'

export interface Context {
      prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  }

const prisma = new PrismaClient()

const server = new ApolloServer({
      typeDefs,
      resolvers: {
            Query, 
            Mutation,
            Product
      },
      context: async (): Promise<Context> => {
            return {
                prisma,
            }
      }
})

server.listen().then(({ url }: { url: string }) => console.log(`Server is running on ${url}.`))