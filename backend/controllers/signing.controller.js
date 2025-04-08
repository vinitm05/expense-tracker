const User = require("../models/userSchema");

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        msg: err.message || "Some error occurred while creating the User.",
      });
    else res.status(201).send(data);
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        msg: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.findParticular = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res
          .status(404)
          .send({ msg: `Not found User with id ${req.params.id}.` });
      else
        res
          .status(500)
          .send({ msg: "Error retrieving User with id " + req.params.id });
    } else res.send(data);
  });
};

exports.updateUser = (req, res) => {
  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res
          .status(404)
          .send({ msg: `Not found User with id ${req.params.id}.` });
      else
        res
          .status(500)
          .send({ msg: "Error updating User with id " + req.params.id });
    } else res.send(data);
  });
};

exports.deleteUser = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        res
          .status(404)
          .send({ msg: `Not found User with id ${req.params.id}.` });
      else
        res
          .status(500)
          .send({ msg: "Could not delete User with id " + req.params.id });
    } else res.send({ msg: `User was deleted successfully!` });
  });
};
