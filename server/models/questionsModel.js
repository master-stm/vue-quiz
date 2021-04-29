const mongoose = require("mongoose");

//schema
const questionSchema = new mongoose.Schema({
  question: String,
  answers: [String],
  correct: String,
  language: String,
  category: String,
  image: String
});

//model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
