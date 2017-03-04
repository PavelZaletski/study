var express = require('express'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	path = require('path'),
	app = express();

app.use(bodyParser.json({limit: '3mB'}));
app.use(bodyParser.urlencoded({ limit: '3mB', extended: true }));
app.use(express.static(path.join(__dirname, 'Sources')));

app.get('/', function(req, res){
	res.json([{
		a:3
	}])
});


app.listen(3003, 'localhost', function(){
	console.log("Server started: http://localhost:3003");
});
