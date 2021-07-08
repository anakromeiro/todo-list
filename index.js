const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');

const typeDefs = readFileSync('graphql/schema.graphql').toString('utf-8');
const resolvers = require('./src/resolver');

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});