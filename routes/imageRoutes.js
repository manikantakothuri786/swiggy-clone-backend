const express = require("express");

const getImageById = require("../controller/imageController");

const router = express.Router();

router.get("/:id", getImageById);

module.exports = router;
