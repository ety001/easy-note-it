var User = require('../models/user.js');
var Notes = require('../models/note.js');

exports.getNote = function(req, res){
	if(req.session.user == '' || req.session.user == undefined){
		return res.redirect('/signin');
	}
	Notes.getAll(req.body.email , function(){
		
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
			res.render('ajax_note',{
				layout: 'ajax',
				err: err?err:''
			});
			return;
		}
		res.header('Content-Type', 'text/plain');
		var json_txt = JSON.stringify(note); 
		res.send(json_txt);
	});
};