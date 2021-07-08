const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');

const typeDefs = readFileSync('graphql/schema.graphql').toString('utf-8');

const server = new ApolloServer({typeDefs});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});