const express = require("express");
const router = express.Router();

const {
  createUser,
  findAll,
  findParticular,
  updateUser,
  deleteUser,
} = require("../controllers/signing.controller");

router.post("/signup", createUser);

router.get("/fetch", findAll);
router.get("/fetch/:id", findParticular);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
