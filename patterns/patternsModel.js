const db = require('../data/dbConfig.js')

module.exports = {
    add,
    findAll,
    findBy,
    remove
}

function add(details){
    return db('patterns').insert(details, "id")
}