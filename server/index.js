const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');

const dotenv = require('dotenv').config();

const static_path = path.join(__dirname, './public');

const app = express();

// Enable Cross Origin Requests with CORS
app.use(cors({credentials: true, origin: true}));

// Correctly parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HTTPS Redirect for production
if (process.env.NODE_ENV !== 'dev') {
    app.enable('trust proxy');
    app.use((req, res, next) => {
        if (req.secure) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
}

// Listen for requests through API
app.use('/api', api);

// Serve Static Files
app.use(express.static(path.join(__dirname, '../notes-client/build')));

//Default catch all -> to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../notes-client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

// Start server listening
app.listen(process.env.PORT, () => {
    console.log("Server started on port: 3000");
});