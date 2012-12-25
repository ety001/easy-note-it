var mongodb = require('../lib/db');
var ObjectID = require('mongodb').ObjectID;

function Notes(note){
	this.id = note._id;
	this.n_content = note.n_content;
	this.n_x = note.n_x;
	this.n_y = note.n_y;
	this.n_time = note.n_time;
	this.n_cate = note.n_cate;
	this.n_color = note.n_color;
};
module.exports = Notes;

Notes.prototype.save = function (callback){
	var user = {
		email: this.email,
		password: this.password,
	};
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('users', function(err, collection){
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

Notes.get = function (email, callback){
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('users', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({email: email}, function(err, doc){
				mongodb.close();
				if(doc){
					var user = new User(doc);
					console.log("ddd:"+user.id);
					callback(err, user);
				} else {
					callback(err, null);
				}
			});
		});
	});
};

Notes.checkLogin = function (loginInfo, callback){
	mongodb.open(function(err, db){
		if(err){
			return callback(err);
		}
		db.collection('users', function(err, collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne(loginInfo ,function(err,doc){
				mongodb.close();
				if(doc){
					var loginUser = new User(doc);
					callback(err, loginUser);
				} else {
					err = 'Email or password is incorrect!';
					callback(err, null);
				}
			});
		});
	});
}