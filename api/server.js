const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Elisabeth Artistry API')
})

module.exports = server