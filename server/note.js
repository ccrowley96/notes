const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {Note, Board} = require('./db/db_index');
const board = require('./db/models/board');

// Allows you to create object IDs
var ObjectId = require('mongoose').Types.ObjectId; 

/* ----------- NOTES API ----------- */
router.get('/notes', async (req, res) => {
    res.status(200);
    res.json(req.board.notes);
})

// Create new note
router.post('/note', async (req, res) => {
    // Create a new note with req body
    let note = new Note({
        content: req.body.content,
        color: req.body.color
    })

    req.board.notes.push(note);
    req.board.save();

    res.sendStatus(200);
})

// Delete a single note
router.delete('/note/:id', async (req, res) => {
    req.board.notes.pull({"_id": new ObjectId(req.params.id)});
    req.board.save();
    res.sendStatus(200);
})

// Change color of a note
router.post('/note/:id/changeColor/:color', async (req, res) => {
    let note_id = req.params.id;
    let color = req.params.color;

    await Board.updateOne({'notes._id': new ObjectId(note_id)}, {
        '$set': {'notes.$.color': color}
    })
    res.sendStatus(200);
})

// Edit note content
router.post('/note/:id/changeContent', async (req, res) => {
    let note_id = req.params.id;
    let content = req.body.content;

    await Board.updateOne({'notes._id': new ObjectId(note_id)}, {
        '$set': {'notes.$.content': content}
    })
    res.sendStatus(200);
})

module.exports = router;