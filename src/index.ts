import { ApolloServer } from "apollo-server";
import { Query } from './query/index'
import { typeDefs } from "./schema";

const resolvers = {
      Query: Query
}

const server = new ApolloServer({
      typeDefs,
      resolvers
})

server.listen().then(({ url }: { url: string }) => console.log(`Server is running on ${url}.`))