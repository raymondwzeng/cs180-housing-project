const express = require('express');
const operations = require('../operations');
const analytics = require('../analytics');
const router = express.Router()

//Handle POST request coming from api/test. Currently just logs the body, and then sends that back.
router.post('/test', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

router.post('/neighborhoodList', (req, res) => {
    console.log(req.body)
    var jsonString = JSON.stringify(operations.getNeighborhoodList());
    var jsonParse = JSON.parse(jsonString)
    //console.log(req.body)
    res.json(jsonParse);
})

router.get('/medianValueRange', (req, res) => {
    console.log(req.body)
    res.json(analytics.getMedianValueRange(req.body[0], req.body[1]));
})

router.get('/latitudeLongitudeRange', (req, res) => {
    console.log(req.body)
    res.json(analytics.getLatitudeLongitudeRange(req.body[0], req.body[1], req.body[2], req.body[3]));
})

module.exports = router