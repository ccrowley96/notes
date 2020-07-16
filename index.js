const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');

const static_path = path.join(__dirname, './public');

const app = express();

// Correctly parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Listen for requests through API
app.use('/api', api);

// Serve static files
app.use(express.static(static_path));

// Start server listening
app.listen(3000, () => {
    console.log("Server started on port: 3000");
});