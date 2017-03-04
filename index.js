var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/courses', function(request, response) {
  response.json([{
  	title: 'video course 1',
  	duration: '1h 28min',
  	date: 1488638630467,
  	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
  	preview_img: 'https://epam-study.herokuapp.com/img/1.jpg'
  }, {
  	title: 'video course 2',
  	duration: '50min',
  	date: 1488648630459,
  	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
  	preview_img: 'https://epam-study.herokuapp.com/img/2.jpg'
  }, {
  	title: 'video course 3',
  	duration: '1h 28min',
  	date: 1488678630163,
  	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
  	preview_img: 'https://epam-study.herokuapp.com/img/3.jpg'
  }])
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


