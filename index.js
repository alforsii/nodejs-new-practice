const userObject = require("./userObject");
const UserClass = require("./userClass");
const userClass = new UserClass("John Doe", 33, "jd@mail.com");
console.log(
  "🚀 userObject",
  `Hello, my name is ${userObject.name} and I am ${userObject.age}`
);
console.log(userClass.getUser());
