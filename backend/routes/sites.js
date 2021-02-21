const express = require('express');
const router = express.Router();
const database = require('../firebase').database;

router.get('/getSites', async (req, res) => {
  const collRef = database.ref('sites');
  collRef.once("value").then((coll) => {
    let sites = [];
    coll.val().forEach((doc) => {
      sites.push({
        name: doc.name,
        lat: doc.lat,
        long: doc.long,
        address: doc.address,
        link: doc.link,
        type: doc.type,
        times: doc.times, 
      });
    });

    res.status(200).send(sites);
  })
});

router.post('/filterSites', async (req ,res) => {
  console.log(req.body);
  const collRef = database.ref('sites');
  collRef.once("value").then((coll) => {
    let {dow, time, driveThru, walkThru} = req.body.filters;
    if(dow) dow = {0: 'm', 1: 'tu', 2: 'w', 3: 'th', 4: 'f', 5: 'sa', 6: 'su'}[dow];
    if(time) time = time.hours() + time.minutes()/60;

    let sites = [];
    coll.val().forEach((doc) => {
      sites.push(doc);
    })

    // filtering
    let filtered = [];
    let almost = [];
    for(let doc of sites) {
      if(doc.type && !driveThru) continue; // no drive thru
      if(!doc.type && !walkThru) continue; // no walk thru
      if(dow) {
        if(!(dow in doc.times)) continue; // not offered on day 
      }
      if(time) {
        const [ti, tf] = doc.times[dow];
        if(ti>time || time>tf) { // not offered at time
          if(Math.min(Math.abs(time-ti), Math.abs(time-tf)) <= 1) {
            almost.push(doc); // near miss - will add if there's room
          }
          continue;
        }
      }
      
      // matched all filters
      filtered.push(doc);
    }

    filtered = getRandom(filtered, Math.min(10, filtered.length));
    if(filtered.length <= 10) {
      almost = getRandom(almost, almost.length);
      for(let doc of almost) {
        if(filtered.length >= 10) break;
        filtered.push(doc);
      }
    }

    res.status(200).send(filtered);
  })
});
  
module.exports = router;

// randomize returned values. taken from https://stackoverflow.com/a/19270021
const getRandom = (arr, n) => {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}