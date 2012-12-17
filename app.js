
/**
 * Module dependencies.
 */

var express = require('express')
	, note_index = require('./controller/index')
	, user = require('./controller/user')
	, http = require('http')
	, path = require('path')
	, MongoStore = require('connect-mongo')(express)
	, settings = require('./settings')
	, partials = require('express-partials')
	, flash = require('connect-flash');
var app = express();

app.configure(function(){
	//server port
	app.set('port', process.env.PORT || settings.port);
	//view dir
	app.set('views', __dirname + settings.view_dir + settings.templates_dir);
	//view engine
	app.set('view engine', 'ejs');
	//set layout
	app.set('view options',{layout:'layout'});
	app.use(express.logger('dev'));
	app.use(partials());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(flash());//flush must beford session
	app.use(express.cookieParser());
	app.use(express.session({
		secret: settings.cookieSecret,
		store: new MongoStore({
			db: settings.db
		})
	}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.use(function(req, res, next){
	app.locals.email = req.session.email;
	//res.locals.uid = req.session.index;
	app.locals.session = req.session;
	app.locals.csrf = req.session ? req.session._csrf : '';
	app.locals.email_error = req.flash('email_error').length ? req.flash('email_error') : '';
	app.locals.pass_error = req.flash('pass_error').length ? req.flash('pass_error') : '';
	console.log(app.locals.pass_error);
	app.locals.error = req.flash('error').length ? req.flash('error') : '';
	app.locals.success = req.flash('success').length ? req.flash('success') : '';
	next();
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', note_index.index);
app.get('/users', user.list);
app.post('/reg', user.add);
app.get('/reg', user.reg);
app.get('/signin', user.signin);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
