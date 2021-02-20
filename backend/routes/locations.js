const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.get('/getLocations', (req, res) => {
    res.status(500).send({ error: 'Not yet implemented!' });
});

router.post('/addLocation', (req, res) => {
    res.status(500).send({ error: 'Not yet implemented!' });
});
  
module.exports = router;