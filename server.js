// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const mydb           = require('./config/mydb');
const app            = express();
const port = 8000;


app.use(bodyParser.urlencoded({ extended: true }));

// Starting point for the default MongoDB Version
/*
 * 
MongoClient.connect(db.url, (err, database) => {
	  if (err) return console.log(err)

	  require('./app/routes')(app, database);

	  app.listen(port, () => {
	    console.log('We are live on ' + port);
	  });               

})
 */

// Re-write for MySQL
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: mydb.host,
  user: mydb.user,
  //password: mydb.password,
  database: mydb.database
})

connection.connect(function(err) {
  if (err) return console.log(err)

  console.log('You are now connected to MySQL')

  require('./app/routes')(app, connection);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
  
})
