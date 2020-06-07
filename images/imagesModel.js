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

function findByName(name){
    return db('images').where({ "name": name})
}

function update(details, id){
    return db('images').where({ "id": id }).update(details, ["id"])
}

function remove(id){
    return db('images').where({ "id": id }).del()
}