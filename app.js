
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path')
	, MongoStore = require('connect-mongo')(express)
	, setting = require('./setting');
//console.log(MongoStore);
var app = express();

app.configure(function(){
	//server port
	app.set('port', process.env.PORT || setting.port);
	//view dir
	app.set('views', __dirname + setting.view_dir + setting.templates_dir);
	//view engine
	app.set('view engine', 'ejs');
	//set layout
	app.set('view options',{layout:'layout'});
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: setting.cookieSecret,
		store: new MongoStore({
			db: setting.db
		})
	}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});
console.log(app.get('view options'));
app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
