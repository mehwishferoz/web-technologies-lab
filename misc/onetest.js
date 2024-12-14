var http = require('http');

http.createServer(function (req, res){
	res.writeHead(200,{'Content-Type' : 'text/html'});
	//res.write("<h1> good morning </h1>");
	res.write("<body bgcolor='green'>");
    res.write('Hello World!');
    res.end(" <h1> good morning </h1> </body>");
}).listen(8080);			