const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

//exporting the model
module.exports = mongoose.model("Author", authorSchema);

