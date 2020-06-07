const express = require('express')
const images = require('./imagesModel')

const router = express.Router()

router.post('/create', (req, res) => {
    const details = req.body

    if(
        details.name &&
        details.image_url &&
        details.category
    ){
        images.findByName(details.name)
            .then(imageArr => {
                if(imageArr.length > 0){
                    res.status(409).json({ message: `${imageArr[0].name} already exists`})
                } else {
                    images.add(details)
                        .then(imageId => {
                            res.status(201).json({ id: imageId, ...details })
                        })
                        .catch(error => {
                            res.status(500).json({ errorMessage: 'unable to add image'})
                        })
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "unable to add image"})
            })
    } else {
        res.status(400).json({ errorMessage: "name, image_url, and category are all required"})
    }
})

router.get('/', (req, res) => {
    images.findAll()
        .then(images => {
            res.status(200).json(images)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: 'Could not find images' })
        })
})

module.exports = router