const http = require("http");

const server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>Acho que pode ser melhor usar o Express...</h1>");
});

const port = 3450;
server.listen(port, function() {
  console.log(`Escutando a ${port}`); 
});