const Product = require("../models/product");
const multer = require("multer");
const Firm = require("../models/Firm");
const Image = require("../models/Image");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;

    // const image = req.file ? req.file.filename : undefined;
    let imageId;

    if (req.file) {
      const image = await Image.create({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
      });

      imageId = image._id;
    }

    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);

    if (!firm) return res.status(404).json({ error: "Firm not found" });

    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image: imageId,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();

    return res
      .status(200)
      .json(
        { message: "product created successfully", savedProduct },
        savedProduct,
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getProductByFirm = async (req, res) => {
  const firmId = req.params.firmId;

  const firm = await Firm.findById(firmId);
  if (!firm) return res.status(404).json({ error: "Firm not found" });

  const restaurantName = firm.firmName;
  // console.log(restaurantName);
  const products = await Product.find({ firm: firmId });

  return res.status(200).json({ restaurantName, products });
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Product deleted sucessfully", data: deletedProduct });
  } catch (err) {
    console.log(err);
    return res.status(504).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirm,
  deleteProductById,
};
