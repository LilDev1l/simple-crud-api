const events = require('events');
const Person = require('./models/person');

class DB extends events {
    static #persons = [];

    static select(where = () => true) {
        return this.#persons.filter(where);
    }

    static insert(personParam) {
        const person = new Person(personParam)
        this.#persons.push(person);

        return person;
    }

    static update(id, newPerson) {
        const person = this.#persons.find(person => person.id === id);
        if (!person) {
            throw new Error(`failed to update person with id: '${id}'`)
        }
        person.name = newPerson.name;
        person.age = newPerson.age;
        person.hobbies = newPerson.hobbies;

        return person;
    }

    static delete(id) {
        const index = this.#persons.findIndex(person => person.id === id);
        if (index === -1) {
            throw new Error(`failed to delete person with id: '${id}'`)
        }
        this.#persons.splice(index, 1);
    }
}

module.exports = DB;