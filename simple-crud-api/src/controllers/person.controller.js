const personService = require('../services/person.service');

async function personController(req, res) {
    const personId = parseURL(req.url).personId;

    switch (req.method) {
        case 'GET':
            if (personId) {
                writeResponse(200, JSON.stringify(personService.getOne(personId)))
            } else {
                writeResponse(200, JSON.stringify(personService.getAll()));
            }
            break;
        case 'POST':
            const person = JSON.parse(await getBody());
            writeResponse(201, JSON.stringify(personService.add(person)));
            break;
        case 'PUT':
            const newPerson = JSON.parse(await getBody());
            writeResponse(200, JSON.stringify(personService.replace(personId, newPerson)));
            break;
        case 'DELETE':
            personService.remove(personId)
            writeResponse(204);
            break;
        default:
            writeResponse(405, JSON.stringify({message: 'invalid method'}));
    }

    function writeResponse(statusCode, body) {
        res.statusCode = statusCode;
        res.end(body);
    }

    async function getBody() {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        return Buffer.concat(buffers).toString();
    }
}

function parseURL(url) {
    const result = url.slice(1).split('/');

    return {
        personId: result[1]
    }
}

module.exports = {
    personController
};