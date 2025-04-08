const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  // First check if user with this email already exists
  User.findByEmail(email, (err, existingUser) => {
    if (err) {
      res.status(500).send({
        msg: "Error checking for existing user.",
      });
      return;
    }

    if (existingUser) {
      res.status(400).send({
        msg: "User with this email already exists.",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // If user doesn't exist, create new user
    const user = new User({
      name,
      email,
      hashedPassword,
    });

    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          msg: err.message || "Some error occurred while creating the User.",
        });
      else res.status(201).send(data);
    });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // First check if user with this email exists
  User.findByEmail(email, (err, user) => {
    if (err) {
      res.status(500).send({
        msg: "Error checking for user.",
      });
      return;
    }

    if (!user) {
      res.status(404).send({
        msg: "User not found.",
      });
      return;
    }

    // If user exists, check password
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({
        msg: "Invalid password.",
      });
      return;
    }

    // If password matches, send success response
    res.status(200).send({
      msg: "User login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};
