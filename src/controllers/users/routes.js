const express = require("express");
const router = express.Router();
const createUser = require("./create.userController");
const loginUser = require("./login.userController");
const deleteUser = require("./delete.userController");
const updateUser = require("./update.userController");
const validator = require("../../helpers/validator");

router.post("/", createUser.service).post("/login", loginUser.service);
router.delete("/:id", deleteUser.service);
router.put("/:id", updateUser.validation, validator, updateUser.service);

module.exports = router;
