const mysql = require("promise-mysql");

const dbSettings = {
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "furniture_store"
}

const getDatabase = async () => {
    return connection = await mysql.createConnection(dbSettings);
}

module.exports = {getDatabase}