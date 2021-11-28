const { v4: uuidv4 } = require('uuid');

class Person {
    constructor(options) {
        this.id = uuidv4();
        this.name = options.name;
        this.age = options.age;
        this.hobbies = options.hobbies;
    }
}

module.exports = Person;