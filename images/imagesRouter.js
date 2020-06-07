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
        images.add(details)
            .then(imageId => {
                res.status(201).json({ id: imageId, ...details })
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'unable to add image'})
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

router.get('/:id', (req, res) => {
    const id = req.params.id

    images.findById(id)
        .then(image => {
            if(image.length > 0){
                res.status(200).json(image)
            } else {
                res.status(404).json({ errorMessage: 'image not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'unable to find image' })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const details = req.body

    images.findById(id)
        .then(imageArr => {
            if(imageArr.length > 0){
                images.update(details, id)
                    .then(imageId => {
                        res.status(200).json({ id: imageId })
                    })
                    .catch(error => {
                        res.status(500).json({ errorMessage: 'unable to update image info'})
                    })
            } else {
                res.status(404).json({ message: `${details.name} image not found`})
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'unable to update pattern' })
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    images.findById(id)
        .then(imageArr => {
            if(imageArr.length > 0){
                images.remove(id)
                    .then(delNum => {
                        res.status(200).json({ message: `${imageArr[0].name} deleted`, deletedImage: imageArr[0]})
                    })
                    .catch(error => {
                        res.status(500).json({ errorMessage: 'unable to remove image'})
                    })
            } else {
                res.status(404).json({ errorMessage: 'image not found'})
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'unable to remove pattern'})
        })
})

module.exports = router