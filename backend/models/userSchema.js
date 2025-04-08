const sql = require("../config/db");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
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

User.findById = (userId, result) => {
  sql.query("SELECT * FROM users WHERE id = ?", userId, (err, res) => {
    if (err) {
      console.error("Error finding user by id:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user:", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.error("Error retrieving users:", err);
      result(err, null);
      return;
    }

    console.log("Users:", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [user.name, user.email, id],
    (err, res) => {
      if (err) {
        console.error("Error updating user:", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated user:", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.error("Error deleting user:", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted user with id:", id);
    result(null, res);
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
