const mongoose = require('mongoose');
const Note = require('./note').schema;

const boardSchema = mongoose.Schema({
    notes: [Note],
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        required: true
    }
});

// Expire at the time indicated by the expireAt field
boardSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

module.exports = mongoose.model("Board", boardSchema);