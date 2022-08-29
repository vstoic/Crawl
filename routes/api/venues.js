const express = require("express");
const router = express.Router();
const validateVenueInput = require('../../validation/venues');
const Venue = require('../../models/Venue')

router.get("/test", (req, res) => res.json({ msg: "This is the venues route" }));

// Index route; grabs all venues
router.get('/', (req, res) => {
  Venue.find().then(venues => res.json(venues))
})

// Route to retrieve individual venues
router.get('/:id', (req, res) => {
  // filters by question id
  const filter = { _id: req.params.id };

  Venue.findOne(filter)
    .then(venue => {
      if (venue) {
        return res.json(venue)
      } else {
        return res.json({ error: "Venue not found" }).status(404)
      }
    })
    .catch(() => res.status(404).json({ error: "Venue not found" }))
});

//Create a venue
router.post('/', (req, res) => {
  // validates venue information
  const { errors, isValid } = validateVenueInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const description = req.body.description;
  const cost = req.body.cost;
  const address = req.body.address;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const image = req.body.image;


  const newVenue = new Venue({
    name,
    description,
    cost,
    address,
    longitude,
    latitude,
    image
  });

  newVenue.save()
    .then(crawl => res.json(crawl).status(200))
    .catch(err => res.json(err).status(404))
});

// Updates Venue -- 
router.patch('/:id', (req, res) => {

  // validates updates
  const { errors, isValid } = validateVenueInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const description = req.body.description;
  const cost = req.body.cost;
  const address = req.body.address;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const image = req.body.image;


  const filter = { _id: req.params.id };
  const update = {
    name,
    description,
    cost,
    address,
    longitude,
    latitude,
    image
  };

  Venue.findOneAndUpdate(filter, update, { new: true })
    .then(venue => res.json(venue).status(200))
    .catch(() => res.json({ error: "Venue not found" }).status(404))
});

// Delete route for venue
router.delete('/:id', (req, res) => {

  const venueFilter = { _id: req.params.id };
  // deletes Crawl
  Venue.findOneAndRemove(venueFilter)
    .then(venue => res.status(200).json(venue))
    .catch(() => res.status(404).json({ error: "Venue not found" })
    )
});