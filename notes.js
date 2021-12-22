const fs = require('fs');

var fetchNote = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.txt'));
  } catch (error) {
    return [];
  }
};

var addingNote = (title, body) => {
  var notes = fetchNote();

  var note = {
    title,
    body,
  };

  var double = notes.filter((note) => note.title === title);
  if (double.length === 0) {
    notes.push(note);

    fs.writeFileSync('notes.txt', JSON.stringify(notes));
    logNote(note);
  } else {
    console.log('STOP: TITLE ALREADY EXISTS!');
  }
};

var removeNote = (title) => {
  var notes = fetchNote();
  var filteredNotes = notes.filter((notes) => notes.title !== title);
  fs.writeFileSync('notes.txt', JSON.stringify(filteredNotes));
};

var readNote = (title) => {
  var notes = fetchNote();
  var filteredNotes = notes.filter((notes) => notes.title === title);

  logNote(filteredNotes[0]);
};

var getAll = () => {
  var notes = fetchNote();
  notes.forEach((note) => logNote(note));
};

const logNote = (note) => {
  console.log(`********************************************`);
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addingNote,
  removeNote,
  readNote,
  getAll,
};
