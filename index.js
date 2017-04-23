var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});

app.post('/', function(request, response) {
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.json({status: 'success'});
});

var list = db.courses;
app.get('/courses', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	if (req.query.search){
		res.json(list.filter((item)=>{
				return item._title.indexOf(req.query.search) !== -1;
			}));
	} else {
		res.json(list);
	}
});

app.get('/courses/refresh', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	list = db.courses;
	res.json(list);
});

app.delete('/courses/:id', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");

	list = list.filter((item)=>{
		return item._id !== req.params.id;
	});

	res.json({status: 'success'});
});

app.post('/auth/login', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	if (req.body.username === 'test' && req.body.password === '12345'){
		res.json({
			status: 'success', token: 'token12345'
		});
	} else {
		res.json({
			status: 'error'
		});
	}
});

app.get('/auth/logout', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	res.json({status: 'success'});
});

app.get('/authors', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	res.json([
		'Author1',
		'Author2',
		'Author3',
		'Author4',
		'Author5',
		'Author6',
		'Author7'
	]);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


