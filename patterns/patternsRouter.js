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
        patterns.findByName(details.name)
            .then(pattern => {
                if(pattern.length > 0){
                    res.status(409).json({ message: `${pattern[0].name} already exists`})
                } else {
                    patterns.add(details)
                        .then(patternId => {
                            res.status(201).json({ id: patternId })
                        })
                        .catch(error => {
                            res.status(500).json({ errorMessage: "unable to add pattern" })
                        })
                }
            })
            .catch(error => res.status(500).json({ errorMessage: "issue with findByName"}))
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

router.get('/:id', (req, res) => {
    const id = req.params.id

    patterns.findById(id)
        .then(pattern => {
            res.status(200).json(pattern)
        })
        .catch(error => {
            res.status(404).json({ errorMessage: 'pattern not found'})
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const details = req.body

    patterns.findById(id)
        .then(pattern => {
            if(pattern.length > 0){
                patterns.update(details, id)
                    .then(patternId => {
                        res.status(200).json({ id: patternId, message: `${patternId} updated`})
                    })
                    .catch(error => {
                        res.status(500).status({ errorMessage: 'unable to update pattern'})
                    })
            } else {
                res.status(404).json({ errorMessage: `${details.name} pattern not found`})
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'unable to update pattern'})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    patterns.findById(id)
        .then(pattern => {
            if(pattern.length > 0){
                patterns.remove(id)
                    .then(delNum => {
                        res.status(200).json({ message: `${pattern[0].name} deleted`, deletedPattern: pattern})
                    })
                    .catch(error => {
                        res.status(500).json({ errorMessage: 'unable to remove pattern'})
                    })
            } else {
                res.status(404).json({ message: 'pattern not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'unable to remove pattern'})
        })
})

module.exports = router