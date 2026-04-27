const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://myAtlasDBUser:<db_password>@myatlasclusteredu.hquwk.mongodb.net/?appName=myAtlasClusterEDU")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/contact", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});