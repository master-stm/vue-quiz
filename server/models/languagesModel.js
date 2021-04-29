const mongoose = require("mongoose");


//schema
const languageSchema = new mongoose.Schema({
  language: String
});

//model
const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
