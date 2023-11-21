const graphql = require("graphql");
const _ = require("lodash");

//dummy data start
const books = [
  {
    name: "Name of the wind",
    genre: "Fantasy",
    id: "1",
    authorId: "1",
  },
  {
    name: "1989",
    genre: "Dystopian",
    id: "2",
    authorId: "2",
  },
  {
    name: "Dune",
    genre: "Sci-fi",
    id: "3",
    authorId: "3",
  },
];

const authors = [
  {
    name: "Patrick Rothfuss",
    age: 44,
    id: "1",
  },
  {
    name: "George Orwell",
    age: 42,
    id: "2",
  },
  {
    name: "Frank Herbert",
    age: 65,
    id: "3",
  },
];

// dummy data end

/**
 * Schema file has 3 responsibilities:
 * 1. Define types
 * 2. Define relationships b/w types
 * 3. Defining root queries. i.e entry point to graph.
 */

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/other source
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

