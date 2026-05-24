console.log("Article:", Article);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Article = require("./models/Article");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect("mongodb://localhost:27017/echo")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// TEST route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// GET all articles
app.get("/articles", async (req, res) => {
  // Fetch all articles from the datanode base
  const articles = await Article.find();
  // Send the articles back to the client
  res.json(articles);
});

// CREATE
app.post("/articles", async (req, res) => {
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.json(newArticle);
});

// DELETE
app.delete("/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE article
app.put("/articles/:id", async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});