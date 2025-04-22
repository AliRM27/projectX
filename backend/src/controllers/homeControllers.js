import Shop from "../models/Shop.js";

export const getHome = async (req, res) => {
  try {
    const { view } = req.query;

    if (!view) {
      return res.status(400).json({ message: "Invalid view parameter" });
    }

    const categories = view.split(",");
    let shops;

    if (categories.includes("all")) {
      shops = await Shop.find().limit(10);
    } else {
      shops = await Shop.find({ category: { $in: categories } });
    }
    return res.status(200).json({ shops });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
