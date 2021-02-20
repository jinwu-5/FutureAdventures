import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import mongoose from "mongoose";
import { MONGODB } from "./config.js";

const app = express();
const PORT = 5000;

// connect to ApolloServer

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});

// connect to MongoDB

mongoose.connect(
  MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("Connected to the db")
);
