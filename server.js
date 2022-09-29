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