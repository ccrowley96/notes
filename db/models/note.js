const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Note", noteSchema);