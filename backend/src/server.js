import d from "dotenv";
import e, { json } from "express";
import connectDB from "./config/db.js";
d.config();
connectDB();

const PORT = process.env.PORT || 4444;
const app = e();

app.use(json());

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
