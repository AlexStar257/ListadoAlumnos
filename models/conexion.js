const mysql = require("mysql2");
const { config } = require("dotenv");

config();

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "sistema"
})

connection.connect( (err) => {
    if (err) {
        console.log("Surgio un error al conectarse" + err);
    } else {
        console.log("Se conectó con exito")
    }
})

module.exports = connection;