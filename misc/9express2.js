var http = require("http");
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:true});
//--------------//
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "kletech"
});
//--------------//
app.get('/send', function(req, res){
    var rr = "<html>";
    rr = rr + "<body>";
    rr = rr + "<form method='post' action='thank' >";
    rr = rr + "roll number" + "<input type='number' name='one' value=' '/>";
    rr = rr + "per" + "<input type='number' name ='two' value=' '/>";
    rr = rr + "name" + "<input type='text' name='three' value=' '/>";
    rr = rr + "<input type='submit' name='t1' value='send '>";
    rr = rr + "</form>";
    rr = rr + "</body>";
    res.send(rr);
})
app.post('/thank', urlencodedParser, function (req, res){
    var reply = '';
    roll=req.body.one;
    per=req.body.two;
    namee=req.body.three;
    var sql = " insert into student(roll,per,name) values("+roll+","+per+","+"'"+namee+"')";
    con.connect(function(err){
        if(err) throw err;
        console.log("connected");
    });
    con.query(sql, function(err,result){
        if(err) throw err;
        console.log("rec inserted");
    });
    res.write("record inserted");
    res.end();
}).listen(9000);