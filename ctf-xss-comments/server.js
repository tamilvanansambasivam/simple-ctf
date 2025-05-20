const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const commentsFile = "./comments.json";
const flag = fs.readFileSync("flag.txt", "utf8");

// Serve submission page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Handle new comment submissions
app.post("/comment", (req, res) => {
  const { name, comment } = req.body;
  const comments = JSON.parse(fs.readFileSync(commentsFile, "utf8"));

  comments.push({ name, comment });
  fs.writeFileSync(commentsFile, JSON.stringify(comments));

  res.send('Comment submitted! <a href="/comments">View Comments</a>');
});

// Display comments without sanitizing (vulnerable!)
app.get("/comments", (req, res) => {
  const comments = JSON.parse(fs.readFileSync(commentsFile, "utf8"));

  let commentHtml = comments
    .map((c) => `<p><b>${c.name}:</b> ${c.comment}</p>`)
    .join("\n");

  const page = `
    <!DOCTYPE html>
    <html>
    <head><title>All Comments</title></head>
    <body>
      <h2>Comments</h2>
      <div id="comments">${commentHtml}</div>
      <a href="/">Back to submit</a>
    </body>
    </html>
  `;

  res.send(page);
});

app.listen(3000, () => {
  console.log("XSS CTF running on http://localhost:3000");
});
