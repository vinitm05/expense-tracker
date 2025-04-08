const sql = require("../config/db");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.hashedPassword;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.error("Error creating user:", err);
      result(err, null);
      return;
    }

    console.log("Created user:", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.error("Error finding user by email:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user:", res[0]);
      result(null, res[0]);
      return;
    }

    result(null, null);
  });
};

module.exports = User;
