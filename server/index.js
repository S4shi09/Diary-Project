const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

// Fix for Prisma default export
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Test route
app.get("/", (req, res) => {
  res.send("Diary API is running!");
});

// CREATE a new diary entry
app.post("/api/entries", async (req, res) => {
  const { title, content, mood } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const entry = await prisma.diaryEntry.create({
      data: {
        title,
        content,
        mood, // optional
      },
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create entry" });
  }
});

// READ all diary entries
app.get("/api/entries", async (req, res) => {
  try {
    const entries = await prisma.diaryEntry.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// READ single diary entry by ID
app.get("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await prisma.diaryEntry.findUnique({
      where: { id: parseInt(id) },
    });
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch entry" });
  }
});

// UPDATE a diary entry
app.put("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, mood } = req.body;

  try {
    const updatedEntry = await prisma.diaryEntry.update({
      where: { id: parseInt(id) },
      data: { title, content, mood },
    });
    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update entry" });
  }
});

// DELETE a diary entry
app.delete("/api/entries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.diaryEntry.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
