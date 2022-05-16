const express = require('express');
const { OperationsLayer } = require('../operations')
const analytics = require('../analytics');
const router = express.Router()

//Handle POST request coming from api/test. Currently just logs the body, and then sends that back.
router.post('/test', (req, res) => {
    console.log("api/test call:")
    console.log(req.body)

    res.json(req.body)
})

router.post('/neighborhoodList', (req, res) => {
    console.log("api/neighborhoodList call:")

    var result = JSON.parse(JSON.stringify(OperationsLayer.getNeighborhoodList()));
    console.log(result.length + " neighborhoods were successfully queried!")
    res.json(result);
})

router.post('/getFilteredData', (req, res) => {
    console.log("api/getFilteredData call:")

    let result = JSON.parse(JSON.stringify(analytics.filterByAll(req.body)))
    console.log(result.length + " neighborhoods were successfully queried!")
    res.json(result)
})

/*
API call for the create function in the operations layer.
req: An array with 15 numbers that can be passed into the neighborhood constructor.
res: string message saying whether or not create operation was successful.
*/
router.post('/cards', (req, res) => {
    console.log("api/cards create:")
    console.log(req.body)

    let neighborhoodData = []
    for (var key in req.body){
        if (!isNaN(req.body[key])) {
            let value = parseInt(req.body[key]);
            neighborhoodData.push(value);
        }
    }

    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.addNeighborhood(neighborhoodData)
    if (result == 0) {
        console.log("create was successful!")
        res.json("Successfully created new neighborhood")
    }
    else {
        console.log("ERROR: unable to create neighborhood with the given information")
        res.json("ERROR: unable to create neighborhood using the given information")
    }
})

/*
API call for the delete function in the operations layer.
req: The id of the neighborhood to delete within the neighborhoodList.
res: string message saying whether or not delete operation was successful.
*/
router.delete('/cards', (req, res) => {
    console.log("api/cards delete:")
    console.log(req.body)

    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.deleteNeighborhood(req.body.id)
    if (result == 0) {
        console.log("delete was successful!")
        res.json("Successfully deleted neighborhood with id: " + req.body.id)
    }
    else {
        console.log("ERROR: unable to delete neighborhood with the given information")
        res.json("ERROR: unable to delete neighborhood with id of " + req.body.id)
    }
})

/*
API call for the update function in the operations layer.
req: An array of the 15 values needed to for the neighborhood constructor.
    id value within the array will be the one that will be updated in the NeighborhoodList.
res: string message saying whether or not delete operation was successful.
*/
router.patch('/cards', (req, res) => {
    console.log("api/cards update:")
    console.log(req.body.state)

    let neighborhoodData = []
    for (var key in req.body.state){
        // push the neighborhood data only if it's a number
        if (!isNaN(req.body.state[key])) {
            let value = parseInt(req.body.state[key]);
            neighborhoodData.push(value);
        }
      }

    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.updateNeighborhood(neighborhoodData)
    if (result == 0) {
        console.log("update was successful!")
        res.json("Successfully updated neighborhood with id: " + req.body.state.id)
    }
    else {
        console.log("ERROR: unable to update neighborhood with the given information")
        res.json("ERROR: unable to update neighborhood with id: " + req.body.state.id)
    }
})

/*
API call to get a single column from the neighborhood list.
req: a url containing a parameter for the string column_name to obtain.
res: an array of numbers from the specified column.
*/
router.get('/column', (req, res) => {
    console.log("api/column call:")
    let paramString = req.url.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    column = queryString.get('column_name')
    console.log(column)

    //TODO: either extend this API call to accept constraint_array info, or remove filtering from the analytics.getColumn() entirely
    const constraint_array = {
        minMedianHousePrice: 0,
        maxMedianHousePrice: 500000,
        minLatitude: -150,
        maxLatitude: 150,
        minLongitude: -150,
        maxLongitude: 150,
        minMedianIncome: 0,
        maxMedianIncome: 50000000.1,
        minID: 0,
        maxID: 300000,
        minMedianAge:0,
        maxMedianAge:100,
        minTotalRooms:0,
        maxTotalRooms:100000,
        minTotalBedrooms:0,
        maxTotalBedrooms:100000,
        minPopulation:0,
        maxPopulation:150000,
        minHouseholds:0,
        maxHouseholds:10000,
        minDistanceToCoast:0,
        maxDistanceToCoast:100000000000,
        minDistanceToLA:0,
        maxDistanceToLA:100000000000,
        minDistanceToSD:0,
        maxDistanceToSD:100000000000,
        minDistanceToSJ:0,
        maxDistanceToSJ:100000000000,
        minDistanceToSF:0,
        maxDistanceToSF:100000000000
    }

    //determine the column number based on the column name
    column_num = -1;
    switch(column){
		case "Median_House_Value": column_num = 1; break;
		case "Median_Income": column_num = 2; break;
		case "Median_Age": column_num = 3; break;
		case "Tot_Rooms": column_num = 4; break;
		case "Tot_Bedrooms": column_num = 5; break;
		case "Population": column_num = 6; break;
		case "Households": column_num = 7; break;
		case "Latitude": column_num = 8; break;
		case "Longitude": column_num = 9; break;
		case "Distance_to_coast": column_num = 10; break;
		case "Distance_to_LA": column_num = 11; break;
		case "Distance_to_SanDiego": column_num = 12; break;
		case "Distance_to_SanJose": column_num = 13; break;
		case "Distance_to_SanFrancisco": column_num = 14; break;
		case "ID": column_num = 15; break;
        default:
            console.log("ERROR: unable to obtain column with name: " + column)
            res.json("ERROR: unable to obtain column with name: " + column)
            break;
	}
    if (column_num != -1) {
        let result = JSON.parse(JSON.stringify(analytics.getColumn(constraint_array, column_num)))
        console.log("api/column GET request was successful")
        res.json(result)
    }
})

/*
Function to get the different top 10 values from the different caches
TODO: split /cache endpoint into 4 separate endpoints, one for each cache
*/
router.get('/cache', (req, res) => {
    console.log("api/cache call:")

    var cacheName = req.query.column;
    var result;

    switch(cacheName) {
        case 'highestMedianValue':
            result = JSON.parse(JSON.stringify(analytics.getHighestMedianValue()))
            console.log("Got 10 highest median values")
            break;
        case 'lowestMedianValue':
            result = JSON.parse(JSON.stringify(analytics.getLowestMedianValue()))
            console.log("Got 10 lowest median values")
            break;
        case 'closestDistanceToCoast':
            result = JSON.parse(JSON.stringify(analytics.getClosestDistanceToCoast()))
            console.log("Got 10 closest distances to coast")
            break;
        case 'highestPopulation':
            result = JSON.parse(JSON.stringify(analytics.getHighestPopulation()))
            console.log("Got 10 highest populations")
            break;
        default:
            console.warn(`Error while handling GET api/cache with query ${req.query}`)
            result = {
                error: "An unknown error has ocurred."
            }
            break;
    }

    res.json(result);
})

module.exports = router