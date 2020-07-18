const mongoose = require('mongoose');
const Note = require('./note').schema;

const boardSchema = mongoose.Schema({
    notes: [Note],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Board", boardSchema);