const {validate: uuidValidate} = require('uuid');
const DB = require('../db');

function getAll() {
    return DB.select();
}

function getOne(id) {
    if (!uuidValidate(id)) {
        throw new Error('Invalid data in request');
    }
    return DB.select(person => person.id === id);
}

function add(person) {
    if (!validPerson(person)) {
        throw new Error('Invalid data in request');
    }
    return DB.insert(person);
}

function replace(id, person) {
    if (!uuidValidate(id)) {
        throw new Error('Invalid data in request');
    }
    return DB.update(id, person);
}

function remove(id) {
    if (!uuidValidate(id)) {
        throw new Error('Invalid data in request');
    }
    DB.delete(id);
}

function validPerson(person) {
    return person.name && person.age && person.hobbies;
}

module.exports = {
    getAll, getOne,
    add,
    replace,
    remove
}