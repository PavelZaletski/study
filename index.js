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
	response.header("Access-Control-Allow-Origin", "*");
	response.json([{
		title: 'video course 1',
		duration: '1h 28min',
		date: 1488638630467,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien mauris, tristique sed facilisis pretium, vehicula sed dui. Donec nec ex in libero feugiat varius ut nec diam',
		img: 'https://epam-study.herokuapp.com/img/1.jpg'
	}, {
		title: 'video course 2',
		duration: '50min',
		date: 1488648630459,
		description: 'Donec dolor tellus, viverra at malesuada in, varius a mi. Mauris nisl leo, faucibus ac justo ut, gravida fringilla dui. Mauris eleifend purus velit, ac sagittis ligula vulputate ut. Etiam consequat porta arcu, vitae eleifend elit consectetur ac',
		img: 'https://epam-study.herokuapp.com/img/2.jpg'
	}, {
		title: 'video course 3',
		duration: '1h 05min',
		date: 1488678630163,
		description: 'Praesent ac iaculis ipsum. Vivamus non feugiat tellus, eu finibus eros. Suspendisse eu maximus ligula, vitae dapibus eros. Suspendisse sed mauris sit amet diam blandit sagittis nec at dolor',
		img: 'https://epam-study.herokuapp.com/img/3.jpg'
	}, {
		title: 'video course 4',
		duration: '1h 37min',
		date: 1488638630260,
		description: 'Curabitur ultricies ante sit amet vehicula efficitur. Fusce suscipit aliquam quam eu elementum. Mauris non arcu orci. Vestibulum tincidunt, quam non molestie rutrum, leo nisl interdum ligula, sit amet euismod nibh enim nec elit',
		img: 'https://epam-study.herokuapp.com/img/4.jpg'
	}, {
		title: 'video course 5',
		duration: '1h 15min',
		date: 1488638630218,
		description: 'Etiam feugiat dui felis, non fringilla dui iaculis non. Pellentesque ac urna sit amet purus molestie malesuada eget et neque. Suspendisse condimentum mauris s',
		img: 'https://epam-study.herokuapp.com/img/5.jpg'
	}, {
		title: 'video course 6',
		duration: '45min',
		date: 1488631530285,
		description: 'Aliquam venenatis felis convallis metus euismod suscipit. Ut efficitur laoreet neque non imperdiet. Duis sit amet consectetur purus, in dictum lectus. Vestibulum ante ipsum primis in faucibus',
		img: 'https://epam-study.herokuapp.com/img/6.jpg'
	}]);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


