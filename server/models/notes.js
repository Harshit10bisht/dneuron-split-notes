const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  notes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Notes = mongoose.model("Notes", notesSchema, "notes-dneuron");
module.exports = Notes;