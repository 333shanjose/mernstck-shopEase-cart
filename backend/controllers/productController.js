const Product = require("../models/item");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

//get productDetails

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get search Products

exports.getProductsBy=async(req,res)=>{
  try {
    const keyword = req.query.keyword;

    let query = {};

    if (keyword) {
      query = {
        name: {
          $regex: keyword,
          $options: "i",
        },
      };
    }

    const products = await Product.find(query);
    console.log(products)

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

