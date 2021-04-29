const mongoose = require("mongoose");


//schema
const categorySchema = new mongoose.Schema({
  category: String
});

//model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
