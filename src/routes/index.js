const express = require("express");
const router = express.Router();
const classRoutes = require("../controllers/classes/routes");

router.use("/class", classRoutes);

module.exports = router;
