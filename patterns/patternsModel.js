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
    return db('patterns').insert(details, "id")
}

function findAll(){
    return db('patterns')
}

function findById(id){
    return db('patterns').where({'id': id })
}

function findByName(name){
    return db('patterns').where({ 'name': name })
}

function update(details, id){
    return db('patterns').where({ 'id': id }).update(details)
}

function remove(id){
    return db('patterns').where({'id': id }).del()
}