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

app.get('/courses', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	var list = db.courses;
	if (req.query.search){
		list = list.filter((item)=>{
			return item._title.indexOf(req.query.search) !== -1;
		});
	}
	res.json(list);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


