const http = require('http');

console.log('successfully run');
const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
