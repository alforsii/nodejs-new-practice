const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const exphbs = require("express-handlebars");

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

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body parser middleware | to use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get users
app.get("/api/users", (req, res) => {
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      //   console.log("🚀 ~ file: app.express.js ~ line 24 ~ .then ~ users", users);
      res.render("index", { title: "Hello World", users });
      //   res.json(users);
    });
});

// get a user
app.get("/api/users/:id", (req, res) => {
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      //   res.render("users.html", { users });
      const user = users.filter((user) => user.id === parseInt(req.params.id));
      if (user.length) {
        res.status(200).json({ message: "Success", user: user[0] });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    });
});

// add user
app.post("/api/users", (req, res) => {
  res.send(req.body);
});
// update user
app.put("/api/users/:id", (req, res) => {
  const theUser = req.body;
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      //   res.render("users.html", { users });
      const foundUser = users.some(
        (user) => user.id === parseInt(req.params.id)
      );
      if (foundUser) {
        users.forEach((user) => {
          if (user.id === parseInt(req.params.id)) {
            const updatedUser = { ...user, ...theUser };
            res
              .status(200)
              .json({ message: "User updated!", user: updatedUser });
          }
        });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    });
});

// set static folder | which means all files in public folder auto set for routes after "/" with the name of the file. Only home page "/" is set auto with index.html and "/" or "/index.html" is the same.
app.use(express.static(path.join(__dirname, "public")));
// app.get("/", (req, res, next) => {
//   console.log(req.url);
//   res.send("Hello");
// });

app.listen(PORT, () => console.log(`🚀 app server running on PORT ${PORT}`));
