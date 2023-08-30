const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//  Route 1: fetch all notes(data) of a user
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Internal Server Error");
  }
});

//  Route 2: Add new Notes(data) of a user:port /api/auth/addnotes
router.post("/addnotes",fetchUser,[
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be atleast greater than 5 characters"
    ).isLength({ min: 5 }),
  ],async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      // if Errors then return error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const saveNote = await notes.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(400).send("Internal Server Error");
    }
  }
);
//  Route 3: Update an existing Notes(data) of a user:port /api/auth/updateNotes
router.put("/updateNotes/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    // Create a new Note Object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    // find the note to be Updated and Update
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send({ note });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Internal Server Error");
  }
});

//  Route 3: Delete an existing Notes Using Delete(data) of a user:port /api/auth/updateNotes
router.delete("/deleteNotes/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be Updated and Update
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow Deletion to delete if user is same
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.send({ Success: "Notes is Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Internal Server Error");
  }
});

module.exports = router;
