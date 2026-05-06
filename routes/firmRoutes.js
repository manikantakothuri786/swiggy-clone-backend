const express = require("express");
const firmController = require("../controller/firmController");
const verifyTOken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/add-firm", verifyTOken, firmController.addFirm);

module.exports = router;
