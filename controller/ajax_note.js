var User = require('../models/user.js');
var Notes = require('../models/note.js');

exports.getNote = function(req, res){
	if(req.session.user == '' || req.session.user == undefined){
		return res.redirect('/signin');
	}
	console.log('test:' + req.body.email);

};