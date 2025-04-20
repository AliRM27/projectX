import Product from "../models/Product.js";
import Shop from "../models/Shop.js";
import User from "../models/User.js";

export const getHome = async (req, res) => {
  try {
    const { view } = req.query;

    if (!view) {
      return res.status(400).json({ message: "Invalid view parameter" });
    }

    const categories = view.split(",");
    let products;

    if (categories.includes("all")) {
      products = await Product.find().limit(10);
    } else {
      products = await Product.find({ category: { $in: categories } });
    }

    return res.status(200).json({ products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
