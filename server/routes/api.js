const express = require('express');
const { OperationsLayer } = require('../operations')
const analytics = require('../analytics');
const router = express.Router()

//Handle POST request coming from api/test. Currently just logs the body, and then sends that back.
router.post('/test', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

router.post('/neighborhoodList', (req, res) => {
    console.log(req.body)
    var jsonString = JSON.stringify(OperationsLayer.getNeighborhoodList());
    var jsonParse = JSON.parse(jsonString)
    //console.log(req.body)
    res.json(jsonParse);
})

router.post('/getFilteredData', (req, res) => {
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
    console.log(req.body)
    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.create(req.body)
    if (result == 0)
        res.json("Successfully created new neighborhood")
    else
        res.json("ERROR: unable to create neighborhood with the given information")
})

/*
API call for the delete function in the operations layer.
req: The id of the neighborhood to delete within the neighborhoodList.
res: string message saying whether or not delete operation was successful.
*/
router.delete('/cards', (req, res) => {
    console.log(req.body)
    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.deleteNeighborhood(req.body.id)
    if (result == 0)
        res.json("Successfully deleted neighborhood with id: " + req.body.id)
    else
        res.json("ERROR: unable to delete neighborhood with id of " + req.body.id)
})

/*
API call for the update function in the operations layer.
req: An array of the 15 values needed to for the neighborhood constructor.
    id value within the array will be the one that will be updated in the NeighborhoodList.
res: string message saying whether or not delete operation was successful.
*/
router.patch('/cards', (req, res) => {
    console.log(req.body)
    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.update(req.body)
    if (result == 0)
        res.json("Successfully updated neighborhood with id: " + req.body.id)
    else
        res.json("ERROR: unable to update neighborhood with id: " + req.body.id)
})

module.exports = router