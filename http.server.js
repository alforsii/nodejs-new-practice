const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const loadFile = req.url === "/" ? "/index" : req.url;
  console.log(
    "🚀 ~ file: http.server.js ~ line 8 ~ server ~ loadFile",
    loadFile
  );
  fs.readFile(
    path.join(__dirname, "public", `${loadFile}.html`),
    //   "utf8",
    (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          fs.readFile(
            path.join(__dirname, "public", "404.html"),
            (err, data) => {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(data);
            }
          );
        } else {
          res.writeHead(500);
          res.end(`Server error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    }
  );
  //   if (req.url === "/") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "index.html"),
  //       //   "utf8",
  //       (err, data) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end(data);
  //       }
  //     );
  //   } else if (req.url === "/about") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "about.html"),
  //       "utf8",
  //       (err, data) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end(data);
  //       }
  //     );
  //   }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 server running on PORT ${PORT}`));
