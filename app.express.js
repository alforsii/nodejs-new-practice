const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");

const PORT = process.env.PORT || 5000;
// Middleware
const logger = (req, res, next) => {
  console.log(req.url);
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};
// Init middleware | should come before static folder
app.use(logger);
// The same as above in short form :)
// app.use((req, res, next) => {
//   console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
//   next();
// });

app.get("/api/users", (req, res) => {
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      console.log("🚀 ~ file: app.express.js ~ line 24 ~ .then ~ users", users);
      //   res.render("users.html", { users });
      res.json(users);
    });
});

app.get("/api/users/:id", (req, res) => {
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      //   res.render("users.html", { users });
      const user = users.filter((user) => user.id === parseInt(req.params.id));
      console.log("🚀 ~ file: app.express.js ~ line 24 ~ .then ~ user", user);
      res.json(user);
    });
});

// set static folder | which means all files in public folder auto set for routes after "/" with the name of the file. Only home page "/" is set auto with index.html and "/" or "/index.html" is the same.
app.use(express.static(path.join(__dirname, "public")));
// app.get("/", (req, res, next) => {
//   console.log(req.url);
//   res.send("Hello");
// });

app.listen(PORT, () => console.log(`🚀 app server running on PORT ${PORT}`));
