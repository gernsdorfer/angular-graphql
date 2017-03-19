const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const MyGraphQLSchema = buildSchema(
  `
 type Query {
  me: User
}

type User {
  id: ID
  name: String
}
`
);
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000);
