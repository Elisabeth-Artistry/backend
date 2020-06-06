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

function findAll(){
    return db('patterns')
}

function findBy(id){
    return db('patterns').where(id)
}

function remove(id){
    return db('patterns').where(id).del()
}