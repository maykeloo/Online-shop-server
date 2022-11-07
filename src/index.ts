import { ApolloServer } from "apollo-server";
import { Query } from './query/index'
import { typeDefs } from "./schema";
import { Mutation, Product } from './resolvers'
import { PrismaClient, Prisma } from '@prisma/client'
import { getUserFromToken } from "./utils/getUserFromToken";

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  userInfo: {
      userId: number;
  } | null,
}

const prisma = new PrismaClient()

const server = new ApolloServer({
      typeDefs,
      resolvers: {
            Query, 
            Mutation,
            Product
      },
      context: async ({ req }): Promise<Context> => {
        const { headers } = req
        const { authorization } = headers
        const userInfo = await getUserFromToken(authorization!)

        return {
            prisma,
            userInfo,
        }
    }
})

server.listen().then(({ url }: { url: string }) => console.log(`Server is running on ${url}.`))


