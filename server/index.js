require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI || "mongodb+srv://myAtlasDBUser:1234@myatlasclusteredu.hquwk.mongodb.net/gymDB"
)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Contact = mongoose.model("Contact", contactSchema);

const ADMIN = {
  email: "admin@gym.com",
  password: "$2b$10$DSUMRrPbayR6rS2iSylhReTjJpLJF3SDCnqhZAGgmjUL1dTidi/Ka"
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password.trim(), ADMIN.password);

console.log({
  entered: password,
  trimmed: password.trim(),
  match: isMatch
});

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data" });
  }
});

app.get("/contacts", async (req, res) => {
  const data = await Contact.find();
  res.json(data);
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
});

app.put("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating" });
  }
});


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log("Server running");
});

