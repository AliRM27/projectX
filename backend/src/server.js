import d from "dotenv";
import e, { json } from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import homeRouter from "./routes/homeRoutes.js";
import shopRouter from "./routes/shopRoutes.js";
import cors from "cors";
d.config();
connectDB();

const PORT = process.env.PORT || 4444;
const app = e();

app.use(json());
app.use(cors());

//home
app.use("/", homeRouter);
//auth
app.use("/auth", authRouter);
//products
app.use("/products", productRouter);
//shops
app.use("/shops", shopRouter);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${PORT}`);
});
