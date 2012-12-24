var mongodb = require('../lib/db');
var ObjectID = require('mongodb').ObjectID;

function User(user){
	this.id = user._id;
	this.email = user.email;
	this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback){
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

User.get = function get(email, callback){
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

User.checkLogin = function (loginInfo, callback){
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