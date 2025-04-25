import Shop from "../models/Shop.js";

export const getAllShops = async (req, res) => {
  try {
    const { name } = req.query;
    let shops;

    if (!name) {
      shops = await Shop.find();
    } else {
      shops = await Shop.find({ name });
    }

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops available." });
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
