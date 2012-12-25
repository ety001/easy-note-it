
/**
 * Module dependencies.
 */

var express = require('express')
	, note_index = require('./controller/index')
	, user = require('./controller/user')
	, notes_info = require('./controller/ajax_note.js')
	, http = require('http')
	, path = require('path')
	, MongoStore = require('connect-mongo')(express)
	, settings = require('./settings')
	, partials = require('express-partials')
	, flash = require('connect-flash')
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
	
	app.use(express.cookieParser(settings.cookieSecret));
	app.use(express.session({
		store: new MongoStore({
			db: settings.db
		}),
		cookie: {
			maxAge: 60000
		}
	}));
	app.use(flash());
	app.use(function(req, res ,next){
		//console.log("OK?:" + req.flash());
		app.locals({
  			session: req.session?req.session:null,
  			email: req.session.user?req.session.user.email:null,
  			msg: req.flash('msg')?req.flash('msg'):null,
			err: req.flash('err')?req.flash('err'):null,
		});
		//console.log(app.locals);
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});



app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', note_index.index);
app.get('/users', user.list);
app.post('/reg', user.add);
app.get('/reg', user.reg);
app.get('/signin', user.signin);
app.post('/signin', user.login);
app.get('/logout', user.logout);
app.post('/save', notes_info.insert);
app.post('/getAll', notes_info.getNote);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
