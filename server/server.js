const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose       = require('mongoose');
var db = require('./config/db');
/* db connection code */
mongoose.connect(db.url, function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});

const app = express();
//Middleware for CORS
app.use(cors());
//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', require('./controllers/users.controller'));

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;