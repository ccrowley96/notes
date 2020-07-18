const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Board} = require('./db/db_index');

const note = require('./note');
const dotenv = require('dotenv').config();


// Allows you to create object IDs
var ObjectId = require('mongoose').Types.ObjectId; 

// Connect to database
mongoose.connect(process.env.MONGO_CONNECT_DEV, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

// Test DB Connection
db.once('open', () =>{
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log("Database Error!");
  console.log(err);
})

/* ----------- MIDDLEWARE ----------- */
async function simulateNetwork(req, res, next){
    await new Promise((res, rej) => setTimeout(() => res(), 500));
    next();
}

// Create Routes for /api
router.get('/', (req, res) => {
    res.send('Welcome to the note API');
})

/* ----------- NOTEBOOK API ----------- */

// Find board by id and then pass to note API
router.use('/board/:bid', findBoard, note)

// Create a new board
router.post('/board', async (req, res)=> {
    let board = new Board();
    await board.save();
    res.status(200);
    res.json({_id: board._id});
})

async function findBoard(req, res, next){
    // Find board
    let board = await Board.findOne({'_id': new ObjectId(req.params.bid)})
    if(board){
        // Attach board to request
        req.board = board;
        next();
    } else{
        res.status(404);
        res.send('Board not found');
        return;
    }
}

module.exports = router;