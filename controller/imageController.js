const Image = require("../models/Image");

const getImageById = async (req, res) => {
  try {
    // console.log("IMAGE REQUEST:", req.params.id);

    // const image = await Image.findById(req.params.id);

    const image = await Image.findById(req.params.id);
    // console.log("IMAGE FOUND:", !!image);

    if (!image) {
      return res.status(400).json({ message: "Image not found" });
    }
    res.set("Content-Type", image.contentType);
    return res.status(200).send(image.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Unable to retrive the image");
  }
};

module.exports = getImageById;
