const Events = require("events");
const uuid = require("uuid").v4;

class MyEvents extends Events {
  logMessage(event, msg) {
    return this.emit(event, { id: uuid(), msg });
  }
}
const myEvent = new MyEvents();

// myEvent.on("message", (data) => console.log(data));
// // myEvent.emit("message", { id: uuid(), msg: "Hello World!" });
// // or shorter way
// myEvent.logMessage("message", "Hello World!");

module.exports = MyEvents;
