var db = require('../models');
// var path = require('path');

module.exports = function (app) {

  // Load index page
  app.get('/', async (req, res) => {
    try {
      var allArtists = await db.Artist.findAll({});
      res.render('index', {
        allArtists
      });
    } catch (err) {
      res.render('500', {
        layout: 'main'
      });
    }
  });


  // Load artist page
  app.get('/artists', async (req, res) => {
    try {
      var allArtists = await db.Artist.findAll({});
      res.render('artists', {
        allArtists
      });
    } catch (err) {
      res.render('500', {
        layout: 'main'
      });
    }
  });

  // Load artists page based on id
  app.get('/artists/:id', async (req, res) => {
    try {
      var artist = await db.Artist.findOne({
        where: {
          id: req.params.id
        }
      });
      var allArtists = await db.Artist.findAll({});
      res.render('artists', {
        artist,
        allArtists
      });
    } catch (err) {
      res.render('500', {
        layout: 'main'
      });
    }
  });

  // Load reseveration page
  app.get('/appointments', async (req, res) => {
    try {
      var allArtists = await db.Artist.findAll({});
      res.render('appointments', {
        allArtists
      });
    } catch (err) {
      res.render('500', {
        layout: 'main'
      });
    }
  });

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404', {
      layout: 'main'
    });
  });
};