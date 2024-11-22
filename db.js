const { Client } = require("pg");

const db = new Client({
    user: process.env.DB_USER,        
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect()
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));

module.exports = db;
