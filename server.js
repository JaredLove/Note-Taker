const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;


const app = express();








app.get('/api/notes', (req, res) => {
  let results = (notes);

 
  res.json(results);
 
  
})

app.get('/api/notes/:id', (req, res) => {
const result = findById(req.params.id, notes);
  if (result) {
  res.json(result);
} else {
  res.send(404);
}
});


app.post('/api/notes', (req, res) => {

  req.body.id = notes.length.toString();
  if ((!req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {

  console.log(`API server now on port ${PORT}!`);

});