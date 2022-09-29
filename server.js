const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;


const app = express();


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// serves public assets
app.use(express.static('public'));
//find note by id
function findById(id, noteArray) {
  const result = noteArray.filter(note => note.id === id)[0];
 
  return result;
}
// create a new note
function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
  }




// api get route for notes 
app.get('/api/notes', (req, res) => {
  let results = (notes);

 
  res.json(results);
 
  
})
// api get route for notes by id
app.get('/api/notes/:id', (req, res) => {
const result = findById(req.params.id, notes);
  if (result) {
  res.json(result);
} else {
  res.send(404);
}
});

// api post route for notes 
app.post('/api/notes', (req, res) => {

  req.body.id = notes.length.toString();
  if ((!req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
})
// serves index html when called
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
// serves notes html when called
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// serves index html when called for error in searc
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {

  console.log(`API server now on port ${PORT}!`);

});