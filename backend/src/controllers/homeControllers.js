import Product from "../models/Product.js";
import Shop from "../models/Shop.js";
import User from "../models/User.js";

export const getHome = async (req, res) => {
  try {
    const { view } = req.query;

    if (!view) {
      return res.status(400).json({ message: "Invalid view parametar" });
    }
    if (view === "all") {
      const products = await Product.find().limit(10);
      return res.status(200).json({ products });
    }
    if (view === "clothing") {
      const shops = await Shop.find().limit(10);
      return res.status(200).json({ shops });
    }
    return res.status(404).json({ message: "Invalid view" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
