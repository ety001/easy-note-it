var mongodb = require('../lib/db');
var ObjectID = require('mongodb').ObjectID;
var settings = require('../settings');

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
    db.authenticate(settings.username, settings.password,function(){
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
    db.authenticate(settings.username, settings.password,function(){
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
	});
};

Notes.delete = function (note_id , callback){
	var note = {
		_id: new ObjectID(note_id)
	};

	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
    db.authenticate(settings.username, settings.password,function(){
      db.collection('notes', function(err, collection){
			  if(err){
				  mongodb.close();
				  return callback(err);
			  }
			  collection.findAndRemove(note, function(err, result){
				  mongodb.close();
				  callback(err, result);
			  });
		  });
    });
	});
};

Notes.getAll = function (conditions, callback){
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
    db.authenticate(settings.username, settings.password,function(){
      db.collection('notes', function(err, collection){
			  if(err){
				  mongodb.close();
				  return callback(err);
			  }
			  collection.find(conditions).toArray(function(err, docs) {
				  mongodb.close();
				  if(docs){
					  callback(err, docs);
				  } else {
					  callback(err, null);
				  }
			  });
		  });
    });
	});
};

Notes.getOne = function (id, callback){
	mongodb.open(function(err, db){
		if(err){
			mongodb.close();
			return callback(err);
		}
    db.authenticate(settings.username, settings.password,function(){
      db.collection('notes', function(err, collection){
			  if(err){
				  mongodb.close();
				  return callback(err);
			  }
			  collection.find({_id:id}, {explain:true}).toArray(function(err, docs) {
				  mongodb.close();
				  if(docs){
					  var note = new Notes(docs);
					  callback(err, note);
				  } else {
					  callback(err, null);
				  }
			  });
		  });
    });
	});
};