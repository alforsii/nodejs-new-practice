class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  getUser() {
    return `Hello, my name is ${this.name} and I am ${this.age}`;
  }
}

module.exports = User;
