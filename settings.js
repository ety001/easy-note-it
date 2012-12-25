if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-2.0'][0]['credentials'];
}
else{
  var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"noteit"
  }
}
module.exports = {
	//server port
	port: 4000,
	//cookie
	cookieSecret: 'noteitfasddfasdf',
	//database
	db: mongo.db,
	host: mongo.hostname,
	mongodb_port: mongo.port,
	username: mongo.username,
	password: mongo.password,
	name: mongo.name,
	//view
	view_dir: '/views',
	templates_dir: '/default',
};
