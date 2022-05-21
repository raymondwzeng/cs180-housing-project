const express = require('express');
const analytics = require('../analytics');
const router = express.Router()

/* api endpoint to get the different top 10 values from the highestMedianValue cache */
router.get('/highestMedianValue', (req, res) => {
    console.log("cache/highestMedianValue call:")

    var result = JSON.parse(JSON.stringify(analytics.getHighestMedianValue()))
	console.log("Got 10 highest median values")
	
	res.json(result);
})

/* api endpoint to get the different top 10 values from the lowestMedianValue cache */
router.get('/lowestMedianValue', (req, res) => {
    console.log("cache/lowestMedianValue call:")

	var result = JSON.parse(JSON.stringify(analytics.getLowestMedianValue()))
	console.log("Got 10 lowest median values")

    res.json(result);
})

/* api endpoint to get the different top 10 values from the closestDistanceToCoast cache */
router.get('/closestDistanceToCoast', (req, res) => {
    console.log("cache/closestDistanceToCoast call:")

    var result = JSON.parse(JSON.stringify(analytics.getClosestDistanceToCoast()))
    console.log("Got 10 closest distances to coast")

    res.json(result);
})

/* api endpoint to get the different top 10 values from the different caches */
router.get('/highestPopulation', (req, res) => {
    console.log("cache/highestPopulation call:")

	var result = JSON.parse(JSON.stringify(analytics.getHighestPopulation()))
	console.log("Got 10 highest populations")

    res.json(result);
})

module.exports = router