const express = require("express");
const { graphqlHTTP } = require("express-graphql"); // This might change based on the dependency version installed
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    //graph schema
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for req on port 4000");
});

