const db = require('../data/dbConfig.js')

module.exports = {
    add,
    findAll,
    findById,
    findByName,
    update,
    remove
}

function add(details){
    return db('images').insert(details, "id")
}

function findAll(){
    return db('images')
}

function findById(id){
    return db('images').where({ "id": id})
}