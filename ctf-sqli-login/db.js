const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./users.db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users");
  db.run("CREATE TABLE users (username TEXT, password TEXT)");
  db.run("INSERT INTO users VALUES ('admin', 'supersecret')");
});

module.exports = db;
