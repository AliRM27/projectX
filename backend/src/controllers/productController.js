import Product from "../models/Product.js";
import Shop from "../models/Shop.js";

// Get all discounted products
export const getAllProducts = async (req, res) => {
  try {
    const { shopId } = req.query;
    let products;

    if (!shopId) {
      products = await Product.find();
    } else {
      products = await Product.find({ shopId });
      let name = await Shop.findById(shopId);
      products.push(name);
    }

    // if (products.length === 0) {
    //   return res.status(404).json({ message: "No products available." });
    // }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product details
export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
