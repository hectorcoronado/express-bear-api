// server.js

var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our PORT

// routes for our APi

var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to our api!' });
});


// more routes for our API will be declared here:


// register our routes:
// all of our routes will be prefixed by /api:
app.use('/api', router);

// start the server:
app.listen(port);
console.log('Express Bear API listening on ', port);
