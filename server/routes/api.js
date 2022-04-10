const express = require('express')
const router = express.Router()

//Handle POST request coming from api/test. Currently just logs the body, and then sends that back.
router.post('/test', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

module.exports = router