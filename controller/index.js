var User = require('../models/user.js');

exports.index = function(req, res){
	if(req.session.user == '' || req.session.user == undefined){
		return res.redirect('/signin');
	}
	
	User.get({email: req.session.user.email} , function(err, collections){
		req.session.user = collections;
	});
	res.render('note_list', {
		title: 'Easy Note It',
		msg: req.flash('msg')
	});
};