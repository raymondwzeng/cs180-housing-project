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
req: An data array with 15 numbers that can be passed into the neighborhood constructor.
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
req: 
    1) The id of the neighborhood to update within the neighborhoodList.
    2) The column number to update (a number from 0 to 13)
    3) The value to replace it with
res: string message saying whether or not delete operation was successful.
*/
router.patch('/cards', (req, res) => {
    console.log(req.body)
    // result var store operation status. 0 means success, -1 means failure
    var result = OperationsLayer.update(req.body[0], req.body[1], req.body[2])
    if (result == 0)
        res.json("Successfully updated neighborhood with id: " + req.body[0] + ", at column: " + req.body[1] + ", with value: " + req.body[2])
    else
        res.json("ERROR: unable to update neighborhood with id of " + req.body[0])
})

module.exports = router