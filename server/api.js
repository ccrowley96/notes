const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Board} = require('./db/db_index');

const note = require('./note');
const dotenv = require('dotenv').config();

const msecUntilExpire = 1000 * 60 * 60 * 24 * 30 * 6; // 6 months in msecs

// Allows you to create object IDs
var ObjectId = require('mongoose').Types.ObjectId; 

// Connect to database
if(process.env.NODE_ENV === 'dev'){
    mongoose.connect(process.env.MONGO_CONNECT_DEV, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
} else{
    mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
}

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

router.get('/verifyBoard/:bid', async (req, res) => {
    let board = await Board.findOne({'_id': new ObjectId(req.params.bid)})
    if(board){
        res.sendStatus(200);
    } else{
        res.sendStatus(404);
    }
})

// Create a new board
router.post('/board', async (req, res)=> {
    let expireAt = new Date(Date.now() + msecUntilExpire);
    let board = new Board({expireAt});
    await board.save();
    res.status(200);
    res.json({_id: board._id});
})

async function findBoard(req, res, next){
    // Find board
    let board = await Board.findOne({'_id': new ObjectId(req.params.bid)})
    if(board){
        // Update expire at time
        let expireAt = new Date(Date.now() + msecUntilExpire);
        // Update expire time
        await Board.updateOne({"_id": new ObjectId(req.params.bid)}, {expireAt: expireAt});
        // Attach board to request
        req.board = board;
        next();
    } else{
        res.status(407);
        res.send('Board not found');
        return;
    }
}

module.exports = router;