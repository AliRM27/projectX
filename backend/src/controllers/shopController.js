import Shop from "../models/Shop.js";

export const getAllShops = async (req, res) => {
  try {
    const { name, showSold } = req.query;

    let shops = [];

    if (!name && showSold === "false") {
      shops = await Shop.find({
        products: { $exists: true, $not: { $size: 0 } },
      });
    } else if (name && showSold === "false") {
      const regex = new RegExp(name, "i");
      shops = await Shop.find({
        name: { $regex: regex },
        products: { $exists: true, $not: { $size: 0 } },
      });
    } else if (!name && showSold === "true") {
      shops = await Shop.find();
    } else {
      const regex = new RegExp(name, "i");
      shops = await Shop.find({
        $or: [{ name: { $regex: regex } }],
      });
    }

    res.status(200).json(shops);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product details
export const getShopDetails = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("products");
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.status(200).json(shop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
