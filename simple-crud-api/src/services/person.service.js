const {validate: uuidValidate} = require('uuid');
const DB = require('../db');
const customErrors = require('../errors/index');

function getAll() {
    return DB.select();
}

function getOne(id) {
    if (!uuidValidate(id)) {
        throw new customErrors.InvalidDataInRequestError(400, 'Invalid data in request');
    }

    const person = DB.select(person => person.id === id)[0];
    if (!person) {
        throw new customErrors.NotFoundPersonError(404, 'Not found person in request');
    }
    return person;
}

function add(person) {
    if (!validPerson(person)) {
        throw new customErrors.InvalidDataInRequestError(400, 'Invalid data in request');
    }
    return DB.insert(person);
}

function replace(id, person) {
    if (!uuidValidate(id)) {
        throw new customErrors.InvalidDataInRequestError(400, 'Invalid data in request');
    }
    return DB.update(id, person);
}

function remove(id) {
    if (!uuidValidate(id)) {
        throw new customErrors.InvalidDataInRequestError(400, 'Invalid data in request');
    }
    DB.delete(id);
}

function validPerson(person) {
    let rs = true;

    if (person.name && person.age && person.hobbies) {
        rs &= checkType(person.name, 'string')
        rs &= checkType(person.age, 'number')
        rs &= Array.isArray(person.hobbies);

        if (rs)
            person.hobbies.forEach(hobby => {
                rs &= checkType(hobby, 'string')
            })
    } else {
        rs = false;
    }

    return rs;
}

function checkType(value, nameType) {
    const type = typeof value;
    return type === nameType;
}

module.exports = {
    getAll, getOne,
    add,
    replace,
    remove
}