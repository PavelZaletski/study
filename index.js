var express = require('express');
var app = express();

var db = require('./db');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.post('/', function(request, response) {
	response.setHeader('Access-Control-Allow-Origin', '*')
  response.json({status: 'success'});
});

app.get('/courses', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.json(db.courses);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


