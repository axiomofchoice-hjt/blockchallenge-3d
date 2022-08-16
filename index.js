const Express = require('express');

const server = Express();

server.use('', Express.static('./'));

server.listen(8089, function () {
    console.log('listening on port 8089');
});
