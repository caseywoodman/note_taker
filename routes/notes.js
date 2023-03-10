const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note Added Successfully 🚀`);
  } else {
    res.error("Note Add Failed");
  }
});

// DELETE ROUTE  ------ SIMILAR TO A POST ROUTE
notes.delete("/:id", (req, res) => {
  const note_id = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => {
      let filteredNotes = notes.filter((note) => note.id !== note_id);
      writeToFile("./db/db.json", filteredNotes);
      res.json(`Note Deleted Successfully 🚀`);
    });
});

module.exports = notes;
