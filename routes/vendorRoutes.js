const {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorById,
} = require("../controller/vendorController");

const express = require("express");

const router = express.Router();

router.post("/register", vendorRegister);
router.post("/login", vendorLogin);

router.get("/all-vendors", getAllVendors);
router.get("/single-vendor/:vendorId", getVendorById);
module.exports = router;
