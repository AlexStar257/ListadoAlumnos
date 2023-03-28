const mysql = require("mysql2");
const { config } = require("dotenv");

config();

const connection = mysql.createConnection({
    host:"52.32.208.197",
    user:"pepito",
    password:"pepito",
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