const express = require("express");
const router = express.Router();
const createClass = require("./create.classController");
const getClass = require("./get.classController");
const updateClass = require("./get.classController");
const deleteClass = require("./delete.classController");
const validator = require("../../helpers/validator");

router.post("/", createClass.validation, createClass.service);
router.get("/", getClass.service);
router.get("/:id", getClass.service);
router.put("/:id", updateClass.service);
router.delete("/:id", deleteClass.service);

module.exports = router;
