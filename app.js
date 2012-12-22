var PORT = +(process.argv[2] || process.env.PORT || 3000);

var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path');

var app = express();

app.configure(function(){
	var compile = function(str, path){
		return stylus(str)
			.set('filename', path)
			.set('compress', true)
			.use(nib());
	};

	app.set('port', PORT);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	// app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: compile
	}));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
