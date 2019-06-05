var db = require('../models');
var path = require("path");

module.exports = function(app) {

  // Load index page
  app.get('/', function(req, res) {
     res.render('index');
  });

  // Load artist page and pass in an artist by id
  app.get('/artist/:id', function(req, res) {
    db.artist.findOne({ where: { id: req.params.id } }).then(function(dbArtist) {
      res.render('artist', {
        id: dbArtist
      });
    });
  });

  // Load about page
  app.get('/', function(req, res) {
    res.render('about');
  });

   // Load reseveration page
   app.get('/', function(req, res) {
      res.render('reservations');
    });
  

  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
