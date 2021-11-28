const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.end('Success');
});

server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
});