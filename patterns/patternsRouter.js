const express = require('express')
const patterns = require('./patternsModel')

const router = express.Router()

router.post('/create', (req, res) => {
    const details = req.body

    if(
        details.name &&
        details.image_url &&
        details.description &&
        details.price
    ){
        patterns.add(details)
            .then(patternId => {
                res.status(201).json({ id: patternId})
            })
            .catch(error => {
                res.status(409).json({errorMessage: `${details.name} already exists`})
            })
    } else {
        res.status(400).json({ errorMessage: "name, image_url, description, and price are all required"})
    }
})

module.exports = router