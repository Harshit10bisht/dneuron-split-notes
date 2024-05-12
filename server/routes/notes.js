const express = require("express");
const router = express.Router();
const Notes = require("../models/notes");
require("dotenv").config();

router.post("/addNotes", async (req, res) => {
  const { notes, is_update } = req.body;

  try {
    if (!notes)
      res.status(422).json({ msg: `Please enter something to insert note` });
    else {
      if (!is_update) {
        const new_note = new Notes({ notes });
        // console.log("NOTES : ", new_note);
        await new_note.save();
        res.status(200).json({ msg: `This note is saved successfully` });
      } else {
        const lastNote = await Notes.findOne().sort({ createdAt: -1 });
        lastNote.notes = notes;
        await lastNote.save();
        res.status(200).json({ msg: `Last note is updated successfully` });
      }
    }
  } catch (e) {
    console.log("ERROR : ", e);
    res.status(400).send(e);
  }
});

router.delete("/deleteAll", async (req, res) => {
  try {
    await Notes.deleteMany({});
    res.status(200).json({ msg: "All notes deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get('/getAll', async (req, res) => {
    try {
      const allNotes = await Notes.find({}).sort({ createdAt: -1 }).limit(5);
      res.status(200).json({ msg: "All notes are deleted successfully from database" });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  });

module.exports = router;