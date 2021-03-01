const fs = require("fs");
const path = require("path");
const MyEvents = require("./event");
const myEvent = new MyEvents();

// To create path/folder

// fs.mkdir(path.join(__dirname, "/events"), {}, (err) => {
//   if (err) throw err;
//   console.log("folder created");
// });

myEvent.on("msg", (msg) => {
  fs.readFile(
    path.join(__dirname, "/events", "savedEvents.json"),
    "utf8",
    (err, data) => {
      const msgs = data ? JSON.parse(data) : [];
      msgs.push(msg);
      console.log("🚀 msgs:", msgs.length);

      if (err) {
        fs.writeFile(
          path.join(__dirname, "/events", "savedEvents.json"),
          JSON.stringify(msgs),
          (err) => {
            if (err) throw err;
            console.log("new msg created!");
          }
        );
      } else {
        fs.writeFile(
          path.join(__dirname, "/events", "savedEvents.json"),
          JSON.stringify(msgs),
          (err) => {
            if (err) throw err;
            console.log("msg created!");
          }
        );
      }
    }
  );
});

myEvent.logMessage("msg", "Hello event");
