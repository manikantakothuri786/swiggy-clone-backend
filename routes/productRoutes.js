const express = require("express");

const {
  addProduct,
  getProductByFirm,
} = require("../controller/productController");

const router = express.Router();

router.post("/add-product/:firmId", addProduct);
router.get("/:firmId/products", getProductByFirm);

module.exports = router;
