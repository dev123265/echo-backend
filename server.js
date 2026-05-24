const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECT =================
mongoose.connect("mongodb+srv://devmajumdar05_db_user:dev122112@cluster0.0lxvpz9.mongodb.net/echo?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ================= SCHEMA =================
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  author: String,
  excerpt: String,
  content: String,
  image: String,
  date: String
});

const Article = mongoose.model("Article", articleSchema);

// ================= ROUTES =================

// Home
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

// Test
app.get("/test", (req, res) => {
  res.json({ message: "TEST OK" });
});

// GET all articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().sort({ _id: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE article
app.post("/articles", async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const saved = await newArticle.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE article
app.put("/articles/:id", async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE article
app.delete("/articles/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= START SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});