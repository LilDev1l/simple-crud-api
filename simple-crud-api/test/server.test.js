const request = require('supertest');
const server = require('../src/server');

describe('simple crud api server', () => {

    let id = '';

    test('should get an empty array', () => {
        request(server)
            .get("/person")
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([])
            .end(() => {});
    });

    test('should get a new object', () => {
        request(server)
            .post('/person')
            .send({name: 'test', age: 20, hobbies: ['test', 'test']})
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({id: id, name: 'test', age: 20, hobbies: ['test', 'test']})
            .end((err, res) => {
                id = res.body.id;
            });
    });

    test('should get the previously created object', () => {
        request(server)
            .get(`/person/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({id: id, name: 'test', age: 20, hobbies: ['test', 'test']})
            .end(() => {});
    });


    test('should get updated object', () => {
        request(server)
            .put(`/person/${id}`)
            .send({name: 'test_update', age: 20, hobbies: ['test_update', 'test_update']})
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({id: id, name: 'test_update', age: 20, hobbies: ['test_update', 'test_update']})
            .end(() => {});
    });

    test('should get status code 204', () => {
        request(server)
            .delete(`/person/${id}`)
            .expect(204)
            .end(() => {});
    });

    test('should get status code 404 with the message "Not found person in request"', () => {
        request(server)
            .get(`/person/${id}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({message: 'Not found person in request'})
            .end(() => {});
    });
});