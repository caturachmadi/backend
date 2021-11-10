const express = require("express");
const router = express.Router();
const createUser = require("./create.userController");
const loginUser = require("./login.userController");

router.post("/", createUser.service).post("/login", loginUser.service);

module.exports = router;
