const http = require('http');
const {personController} = require('./controllers/person.controller');
const customErrors = require('./errors/index');

function startServer() {
    const server = http.createServer();

    server.on('request', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        try {
            if (/^\/person/.test(req.url)) {
                await personController(req, res);
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({message: 'Resource that you requested doesn\'t exist'}));
            }
        } catch (err) {
            if (err instanceof customErrors.NotFoundPersonError ||
                err instanceof customErrors.InvalidDataInRequestError) {
                res.statusCode = err.statusCode;
                res.end(JSON.stringify({message: err.message}));
            } else {
                res.statusCode = 500;
                res.end(JSON.stringify({message: 'Server error'}));
            }
        }
    });

    server.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}...`);
    });
}

module.exports = {
    startServer
}
