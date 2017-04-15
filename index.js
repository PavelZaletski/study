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

app.post('/', function(request, response) {
	response.setHeader('Access-Control-Allow-Origin', '*')
  response.json({status: 'success'});
});

app.get('/courses', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.json([{
		_id: '1',
		_title: 'Lorem ipsum dolor sit amet',
		_duration: 75,
		_date: 1490820996354,
		_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien mauris, tristique sed facilisis pretium, vehicula sed dui. Donec nec ex in libero feugiat varius ut nec diam',
		_topRated: true
	}, {
		_id: '2',
		_title: 'Quisque iaculis tincidunt',
		_duration: 28,
		_date: 1490910996354,
		_description: 'Donec dolor tellus, viverra at malesuada in, varius a mi. Mauris nisl leo, faucibus ac justo ut, gravida fringilla dui. Mauris eleifend purus velit, ac sagittis ligula vulputate ut. Etiam consequat porta arcu, vitae eleifend elit consectetur ac',
		_topRated: false
	}, {
		_id: '3',
		_title: 'Mauris ornare tellus vitae ',
		_duration: 48,
		_date: 1490810997354,
		_description: 'Praesent ac iaculis ipsum. Vivamus non feugiat tellus, eu finibus eros. Suspendisse eu maximus ligula, vitae dapibus eros. Suspendisse sed mauris sit amet diam blandit sagittis nec at dolor',
		_topRated: false
	}, {
		_id: '4',
		_title: 'Duis ornare mattis rhoncus',
		_duration: 80,
		_date: 1491530996354,
		_description: 'Curabitur ultricies ante sit amet vehicula efficitur. Fusce suscipit aliquam quam eu elementum. Mauris non arcu orci. Vestibulum tincidunt, quam non molestie rutrum, leo nisl interdum ligula, sit amet euismod nibh enim nec elit',
		_topRated: false
	}, {
		_id: '5',
		_title: 'Sed sed viverra turpis',
		_duration: 90,
		_date: 1498638630218,
		_description: 'Etiam feugiat dui felis, non fringilla dui iaculis non. Pellentesque ac urna sit amet purus molestie malesuada eget et neque. Suspendisse condimentum mauris s',
		_topRated: true
	}, {
		_id: '6',
		_title: 'Suspendisse justo ligula',
		_duration: 47,
		_date: 1488631530285,
		_description: 'Aliquam venenatis felis convallis metus euismod suscipit. Ut efficitur laoreet neque non imperdiet. Duis sit amet consectetur purus, in dictum lectus. Vestibulum ante ipsum primis in faucibus',
		_topRated: true
	}]);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


