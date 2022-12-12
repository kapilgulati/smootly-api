// index.js
// This is the main entry point of our application
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './service/db.js';
import typeDefs from './typedef/schema.js';
import resolvers from './resolver/index.js';
import User from './model/user.js';

dotenv.config();

const port = process.env.PORT || 4000;

db.connect();

const app = express();
//app.use(cors);

const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: (error) => {
    return error;
  },
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

app.get('/', (req, resp) => resp.send('Hello Smootly!'));
app.listen(port, () =>
  console.log(`App started and listening on port ${port}`)
);

await server.start();
server.applyMiddleware({ app, path: '/api' });
