const express = require("express");
const { graphqlHTTP } = require("express-graphql"); // This might change based on the dependency version installed
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// connect to mongo atlas db
// add mongoose.connect here. I have commented it out for security reasons.

mongoose.connection.once("open", () => console.log("connected to DB"));
app.use(cors());
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

