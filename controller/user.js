
/*
	* Users
	*/
var crypto = require('crypto');
var User = require('../models/user.js');

exports.reg = function(req, res){
	res.render('reg', {
		title: 'Easy Note It',
		err: req.flash('err')
	});
};

exports.signin = function(req, res){
	res.render('signin', {
		title: 'Easy Note It',
		err: req.flash('err')
	});
};

exports.logout = function(req, res){
	req.session.user = null;
	return res.redirect('/signin');
};

exports.login = function(req, res){
	if(req.body.password == '' || req.body.email == ''){
		req.flash('err','Email or password is empty.');
		return res.redirect('/signin');
	}
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var login_user = new User({
		email: req.body.email,
		password: password
	});
	
	User.checkLogin(login_user, function(err, user){
		if(user){
			req.session.user = user;
			req.flash('msg','Login success.');
			return res.redirect('/');
		} else {
			req.flash('err', err);
			return res.redirect('/signin');
		}
	});
};

exports.add = function(req, res){
	if(req.body.password != req.body.password2){
		req.flash('err','Repeat password is wrong.');
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
			req.flash('err', err);
			return res.redirect('/reg');
		}
		newUser.save(function(err){
			if(err){
				req.flash('err' , err);
				return res.redirect('/reg'); 
			}
			req.session.user = newUser;
			req.flash('msg', 'Register success!');
			res.redirect('/');
		});
	});
}