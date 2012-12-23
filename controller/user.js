
/*
	* Users
	*/
var crypto = require('crypto');
var User = require('../models/user.js');

exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.reg = function(req, res){
	res.render('reg', { title: 'Easy Note It' });
};

exports.signin = function(req, res){
	res.render('signin', { title: 'Easy Note It' });
};

exports.add = function(req, res){
	if(req.body.password != req.body.password2){
		req.flash('pass_error','Repeat password is wrong.');
		return res.redirect('/reg');
	}
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		email: req.body.email,
		password: password,
	});

	User.get(newUser.email, function(err , user){
		if(user){
			err = 'Email already exists.';
		}
		if(err){
			req.flash('email_error', err);
			return res.redirect('/reg');
		}
		newUser.save(function(err){
			if(err){
				req.flash('error' , err);
				return res.redirect('/reg'); 
			}
			req.session.user = newUser;
			req.flash('success', 'Register success!');
			res.redirect('/');
		});
	});
}