const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const db = require("./db");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log("Running query:", query);

  db.get(query, (err, row) => {
    if (err) return res.send("Database error.");
    if (row) {
      const flag = fs.readFileSync("flag.txt", "utf8");
      return res.send(`<h2>Welcome ${username}!</h2><p>Flag: ${flag}</p>`);
    } else {
      return res.send("Invalid credentials.");
    }
  });
});

app.listen(3000, () => {
  console.log("CTF Challenge running on http://localhost:3000");
});
