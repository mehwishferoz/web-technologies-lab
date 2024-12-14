var url = require('url');
var http = require('http');
var dt = require ('./mymodule');

http.createServer( function ( req, res){
	res.writeHead(200,{'Content-Type':'text/html'});
	var q = url.parse(req.url,true).query;
	var a =q.a;
	var b = q.b;
	
	a=parseInt(a);
	b= parseInt(b);
	
	res.write("the addition is"+ dt.add(a,b) + "<br>");
	res.write(" the subtraction is" +dt.sub(a,b) + "<br>");
	res.write("the multiplication is"+ dt.mul(a,b) + "<br>");
	res.write(" the divsion is" +dt.div(a,b) + "<br>");
	
	res.end();
}).listen(8081);