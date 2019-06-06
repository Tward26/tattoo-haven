var db = require('../models');
// var path = require('path');

module.exports = function (app) {

  // Load index page
  app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, '../public/index.html'));
    res.render('index');

  });

  app.get('/artists', function (req, res) {
    res.render('artists');

  });

  // Load example page and pass in an example by id
  app.get('/artists/:id', function (req, res) {
    db.Artist.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.render('artists', {
        artists: result
      });
      console.log(result.gallerypath[1]);
    });
  });


  // Load reseveration page
  app.get('/appointments', function (req, res) {
    db.Artist.findAll({}).then(function (result) {
      res.render('appointments', {
        artists: result
      });
    });
  });

  // app.get('/appointments/:id', function (req, res) {
  //   res.render('appointments');
  // });

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404', {
      layout: 'main'
    });
  });
};