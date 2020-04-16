const knex = require('knex');
const knexFile = require('../knexfile');
const db = knex(knexFile.development);

module.exports = {
    getCars,
    insert,
    getById,
    getByVin
}

function getCars(){
    return db('cars');
}

function insert(car){
    return db('cars')
        .insert(car)
        .returning('id')
        .then(id => {
            return getById(id[0]);
        })
}

function getById(id){
    return db('cars')
        .where('id', id);
}

function getByVin(vin){
    return db('cars')
        .where('vin', vin);
}
