var User = require('../models/user.js');
var Notes = require('../models/note.js');

exports.getNote = function(req, res){
	if(req.session.user == '' || req.session.user == undefined){
		return res.redirect('/signin');
	}
	Notes.getAll({n_email:req.session.user.email} , function(err , notes){
		if(err){
			res.header('Content-Type', 'text/plain');
			err = JSON.stringify(err); 
			res.send(err);
		}
		res.header('Content-Type', 'text/plain');
		var json_txt = JSON.stringify(notes); 
		res.send(json_txt);
	});
};

exports.insert = function(req, res){
	if(req.session.user == '' || req.session.user == undefined){
		return res.redirect('/signin');
	}
	var content = req.body.content;
	var note = new Notes({
		n_content: content , 
		n_cate: '', 
		n_color: 'blue', 
		n_email: req.session.user.email,
		n_position: ''
	});

	note.insert(function(err, note){
		if(err){
			res.header('Content-Type', 'text/plain');
			err = JSON.stringify(err); 
			res.send(err);
		}
		res.header('Content-Type', 'text/plain');
		var json_txt = JSON.stringify(note); 
		res.send(json_txt);
	});
};

exports.remove = function(req, res){
	if(req.session.user == '' || req.session.user == undefined){
		return res.redirect('/signin');
	}
	Notes.delete( req.body._id , function(err , result){
		if(err){
			res.header('Content-Type', 'text/plain');
			err = JSON.stringify(err); 
			res.send(err);
		}
		res.header('Content-Type', 'text/plain');
		var json_txt = JSON.stringify(result); 
		res.send(json_txt);
	});
};