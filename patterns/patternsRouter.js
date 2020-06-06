const express = require('express')
const patterns = require('./patternsModel')

const router = express.Router()

router.post('/create', (req, res) => {
    const details = req.body

    if(
        details.name &&
        details.image_url &&
        details.description &&
        details.price &&
        details.yarn_weight &&
        details.hook_size
    ){
        patterns.add(details)
            .then(patternId => {
                res.status(201).json({ id: patternId})
            })
            .catch(error => {
                res.status(409).json({errorMessage: `${details.name} already exists`})
            })
    } else {
        res.status(400).json({ errorMessage: "name, image_url, description, price, yarn_weight, and hook_size are all required"})
    }
})

router.get('/', (req, res) => {
    patterns.findAll()
        .then(patterns => {
            res.status(200).json(patterns)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: 'Could not find patterns'})
        })
})

module.exports = router