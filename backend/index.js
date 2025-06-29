const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token });
});

app.get("/api/notes", auth, async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
  });
  res.json(notes);
});

app.post("/api/notes", auth, async (req, res) => {
  const { title, text } = req.body;
  const note = await prisma.note.create({
    data: { title, text, userId: req.userId },
  });
  res.status(201).json(note);
});

app.get("/api/notes/:id", auth, async (req, res) => {
  const note = await prisma.note.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (note.userId !== req.userId)
    return res.status(403).json({ message: "Forbidden" });
  res.json(note);
});

app.put("/api/notes/:id", auth, async (req, res) => {
  const { title, text } = req.body;
  const note = await prisma.note.update({
    where: { id: parseInt(req.params.id) },
    data: { title, text },
  });
  res.json(note);
});

app.delete("/api/notes/:id", auth, async (req, res) => {
  await prisma.note.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
