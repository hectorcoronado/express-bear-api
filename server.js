// server.js

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/api/bears');
var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // set our PORT

// routes for our APi

var router = express.Router(); // get an instance of the express Router

// middleware to use for all reqs:
router.use(function(req, res, next) {
  // log event:
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to our api!' });
});


// more routes for our API will be declared here:

// routes that end in '/bears':
router.route('/bears')
  // create a bear (accessed at POST http://localhost:3000/api/bears)
  .post(function(req, res) {

    var bear = new Bear(); // create new instance of Bear model
    bear.name = req.body.name; // set bear's name from request

    // save bear and check for errors
    bear.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Bear created!' });
    });
  })

    // get all the bears (accessed at GET http://localhost:3000/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) {
        res.send(err);
      }
    res.json(bears);
    });
  });

// routes that end in '/bears/:bear_id':
router.route('/bears/:bear_id')
  // get bear with specific id (accessed at GET http://localhost:3000/api/bears/:bear_id)
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if(err) {
        res.send(err);
      }
      res.json(bear);
    })
  })

  // update the bear with this id (accessed at PUT http://localhost:3000/api/bears/:bear_id)
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if(err) {
        res.send(err);
      }

      bear.name = req.body.name // update bear's info

      // then save the bear
      bear.save(function(err) {
        if(err) {
          res.send(err);
        }
        res.json({ message: 'Bear updated!' });
      });
    })
  })

  // delete the bear with this id (accessed at DELETE http://localhost:3000/api/bears/:bear_id)
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if(err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted!' });
    })
  });

// register our routes:
// all of our routes will be prefixed by /api:
app.use('/api', router);

// start the server:
app.listen(port);
console.log('Express Bear API listening on ', port);
