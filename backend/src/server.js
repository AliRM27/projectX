import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import productRouter from "./routes/productRoutes.js";
import homeRouter from "./routes/homeRoutes.js";
import shopRouter from "./routes/shopRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import categoryRouter from "./routes/categorieRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4444;
const app = express();

app.use(cors());
app.use(express.json());

//Mobile App
//entry point
app.get("/", (req, res) => {
  res.send("Welcome to the mobile app");
});
//home
app.use("/home", homeRouter);
//auth
app.use("/auth", authRouter);
//profile
app.use("/user", profileRouter);
//wishlist
app.use("/wishlist", wishlistRouter);
//products
app.use("/products", productRouter);
//shops
app.use("/shops", shopRouter);
//Cart
app.use("/cart", cartRouter);
//Orders and Checkout
app.use("/orders", orderRouter);
//categories
app.use("/categories", categoryRouter);

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server running on port ${PORT}`);
});
