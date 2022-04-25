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
    console.log(req.body)
    var jsonString = JSON.stringify(OperationsLayer.getNeighborhoodList());
    var jsonParse = JSON.parse(jsonString)
    //console.log(req.body)
    res.json(jsonParse);
})

router.post('/getFilteredData', (req, res) => {
    console.log("api/getFilteredData call:")
    console.log(req.body)
    let result = JSON.parse(JSON.stringify(analytics.filterByAll(req.body)))
    //console.log(result)
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

    //console.log(neighborhoodData)

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

    //console.log(neighborhoodData)

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

module.exports = router