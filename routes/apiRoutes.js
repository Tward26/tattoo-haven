var db = require('../models');
var calendar = require('../public/js/calendar');

module.exports = function (app) {
  // Get all artists
  app.get('/api/artists', async (req, res) => {
    try {
      const dbArtists = await db.Artist.findAll({});
      res.json(dbArtists);

    } catch (err) {
      res.status(500).send(err);
    }
  });

  //Get a single artist
  app.get('/api/artists/:id', async (req, res) => {
    try {
      const dbArtist = await db.Artist.findAll({ where: { id: req.params.id }, include: [db.Client] });
      res.json(dbArtist);

    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Create a new artist
  app.post('/api/artists', async (req, res) => {
    try {
      const dbArtist = await db.Artist.create(req.body);
      res.json(dbArtist);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Delete an artist by id
  app.delete('/api/artists/:id?', async (req, res) => {
    try {
      const dbArtist = await db.Artist.destroy({ where: { id: req.body.id } });
      res.json(dbArtist);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //Update an artist by id
  app.put('/api/artists/:id?', async (req, res) => {
    try {
      const dbArtist = await db.Artist.update(
        req.body,
        { where: { id: req.body.id } }
      );
      res.json(dbArtist);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Get all clients
  app.get('/api/clients', async (req, res) => {
    try {
      const dbClients = await db.Client.findAll({});
      res.json(dbClients);

    } catch (err) {
      res.status(500).send(err);
    }
  });

  //Get a single client
  app.get('/api/clients/:id', async (req, res) => {
    try {
      const dbClient = await db.Client.findAll({ where: { id: req.params.id }, include: [db.Artist] });
      res.json(dbClient);

    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Create a new client
  app.post('/api/clients', async (req, res) => {
    try {
      let startTime = calendar.buildStart(req.body.date, req.body.time);
      let endTime = calendar.buildEnd(req.body.date, req.body.time);

      let busy = await calendar.busyCheck(req.body.ArtistId, startTime, endTime, req.body.idea, req.body.name, req.body.email);
      console.log(busy);
      //   console.log("Free Busy returned free");
      //   const dbClient = await db.Client.create(req.body);
      //   res.send('Free');
      // else{
      //   console.log("Free Busy returned false");
      //   res.send('Busy');
      // }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Delete a client by id
  app.delete('/api/clients/:id?', async (req, res) => {
    try {
      const dbClient = await db.Client.destroy({ where: { id: req.body.id } });
      res.json(dbClient);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //Update an clent by id
  app.put('/api/clients/:id?', async (req, res) => {
    try {
      const dbClient = await db.Client.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        });
      res.json(dbClient);
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
