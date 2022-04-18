const express = require('express')
const operations = require('../operations')
const router = express.Router()

//Handle POST request coming from api/test. Currently just logs the body, and then sends that back.
router.post('/test', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

router.get('neighborhoodList', (req,res) => {
    res.send(operations.getNeighborHoodList());
})

router.get('medianValueRange', (req, res) => {
    console.log(req.body)
    res.send(analytics.getMedianValueRange(req[0], req[1]))
})



module.exports = router