var db = require('../models');
var path = require('path');

module.exports = function(app) {

  // Load index page
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // Load example page and pass in an example by id
  app.get('/artists/:id', function(req, res) {
    db.Artist.findAll({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render('artists', {
        example: dbExample
      });
    });
  });

  // Load reseveration page
  app.get('/appointments', function(req, res) {
    res.render('appointments');
  });
  
  // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
