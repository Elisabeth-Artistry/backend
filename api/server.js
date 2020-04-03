const express = ('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Elisaveth Artistry API')
})

module.exports = server