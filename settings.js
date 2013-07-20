if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-2.0'][0]['credentials'];
}
else{
  var mongo = {
    "hostname":"ds027758.mongolab.com",
    "port":27758,
    "username":"noteit",
    "password":"woqimm@note",
    "name":"noteit",
    "db":"noteit"
  }
}
module.exports = {
	//server port
	port: 3000,
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
