// MySql
const mysql = require("mysql");

var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "latie",
    charset: "utf8mb4"
});

db.connect(err => {
	if(err) throw err;
	console.log("Connected to database!");
});

module.exports = db;
