const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  category: String,
  author: String,
  excerpt: String,
  content: String,
  image: String,
  date: String
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;