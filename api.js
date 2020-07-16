const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Note} = require('./db/db_index');

// Allows you to create object IDs
var ObjectId = require('mongoose').Types.ObjectId; 

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

// Test DB Connection
db.once('open', () =>{
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log("Database Error!");
  console.log(err);
})

/* ----------- NOTES API ----------- */

// Create Routes for /api
router.get('/', (req, res) => {
    res.send('Welcome to the note API');
})

router.get('/notes', async (req, res) => {
    // Return all notes
    let notes = await Note.find({});
    res.status(200);
    res.json(notes)
})

// Create new note
router.post('/note', (req, res) => {
    
    // Create a new note with req body
    let note = new Note({
        content: req.body.content,
        color: req.body.color
    })

    note.save();
    res.sendStatus(200);
})

router.delete('/note/:id', async (req, res) => {
    // Delete specific note
    let note_id = req.params.id;
    await Note.deleteOne({'_id': new ObjectId(note_id)})

    res.sendStatus(200);
})

module.exports = router;