var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var express = require('express');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '\\public\\index.html'));
});

app.use("/javascripts", express.static(__dirname + '\\public\\javascripts'));

http.listen(3000, function(){
	console.log('listening on *:3000');
});