const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();

const PORT = process.env.port || 4000;

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("Type:", typeof process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log(error));

app.use(cors());

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
// app.use("/uploads", express.static("uploads"));

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const uploadsPath = path.join(process.cwd(), "uploads");

console.log("UPLOADS PATH:", uploadsPath);
console.log("UPLOADS EXISTS:", fs.existsSync(uploadsPath));

if (fs.existsSync(uploadsPath)) {
  console.log("UPLOAD FILES:", fs.readdirSync(uploadsPath));
}

app.use("/uploads", express.static(uploadsPath));

app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT} port`);
});

app.use("/", (req, res) => {
  res.send("<h1>Welcome to Suby</h1>");
});
