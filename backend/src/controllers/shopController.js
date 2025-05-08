import Shop from "../models/Shop.js";

export const getAllShops = async (req, res) => {
  try {
    const { name, showSold } = req.query;
    let shops;

    if (!name && showSold) {
      // No name, no showSold → only shops with products
      console.log("TETS");
      // shops = await Shop.find({ products: { $exists: false } });
    } else if (name && !showSold) {
      console.log("TETS2");
      // Name provided, showSold false → match name + has products
      const regex = new RegExp(name, "i");
      shops = await Shop.find({
        name: { $regex: regex },
        products: { $exists: true, $ne: [] },
      });
    } else if (!name && showSold) {
      // No name, showSold true → all shops
      shops = await Shop.find();
    } else {
      // Name and showSold both true → match name + empty products
      console.log("TETS4");
      const regex = new RegExp(name, "i");
      shops = await Shop.find({
        name: { $regex: regex },
        $or: [{ products: { $exists: false } }, { products: { $size: 0 } }],
      });
    }

    if (shops.length === 0) {
      return res.status(204).json({ message: "No shops found" });
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
