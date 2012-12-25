var mongodb = require('../lib/db');
var ObjectID = require('mongodb').ObjectID;

function Notes(note){
	this.id = note._id;
	this.n_content = note.n_content;
	this.n_cate = note.n_cate;
	this.n_color = note.n_color;
	this.n_email = note.n_email;
	this.n_position = note.n_position;
};
module.exports = Notes;

Notes.prototype.insert = function (callback){
	var note = {
		n_content: this.n_content,
		n_cate: this.n_cate,
		n_color: this.n_color,
		n_email: this.n_email,
		n_position: this.n_position
	};
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('notes', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(note, {safe: true}, function(err, note){
				mongodb.close();
				callback(err, note);
			});
		});
	});
};

Notes.prototype.update = function (callback){
	var user = {
		email: this.email,
		password: this.password,
	};
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('notes', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(user, {safe: true}, function(err, user){
				mongodb.close();
				callback(err, user);
			});
		});
	});
};

Notes.prototype.delete = function (callback){
	var note = {
		_id: this.id
	};
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('notes', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.remove(note, {w: 1}, function(err, result){
				mongodb.close();
				callback(err, result);
			});
		});
	});
};

Notes.getAll = function (email, callback){
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('notes', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({email: email}, function(err, doc){
				mongodb.close();
				if(doc){
					var notes = new Notes(doc);
					callback(err, notes);
				} else {
					callback(err, null);
				}
			});
		});
	});
};

Notes.getOne = function (email, callback){
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('notes', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({email: email}, function(err, doc){
				mongodb.close();
				if(doc){
					var notes = new Notes(doc);
					callback(err, notes);
				} else {
					callback(err, null);
				}
			});
		});
	});
};