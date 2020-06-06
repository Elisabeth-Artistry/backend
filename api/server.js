const express = require('express')
const helmet = require('helmet')

const patternsRouter = require('../patterns/patternsRouter')
const ordersRouter = require('../orders/ordersRouter')
const imagesRouter = require('../images/imagesRouter')

const server = express()

server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => {
    res.send('Elisabeth Artistry API')
})

server.use('/api/patterns', patternsRouter)
server.use('/api/orders', ordersRouter)
server.use('/api/images', imagesRouter)

module.exports = server