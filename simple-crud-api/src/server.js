const http = require('http');
const {personController} = require('./controllers/person.controller');

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
            res.statusCode = 500;
            res.end(JSON.stringify({message: 'Server error'}));
        }
    });

    server.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}...`);
    });
}

module.exports = {
    startServer
}
