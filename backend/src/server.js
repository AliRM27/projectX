import d from "dotenv";
import e, { json } from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import homeRouter from "./routes/home.js";
import cors from "cors";
d.config();
connectDB();

const PORT = process.env.PORT || 4444;
const app = e();

app.use(json());
app.use(cors());

//auth
app.use("/", homeRouter);
app.use("/auth", authRouter);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
