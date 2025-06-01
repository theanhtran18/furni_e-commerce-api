import express from "express";
import cors from "cors";
import { connectToDB } from "./lib/db.js";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import "./lib/redis.js";
import productRouter from "./routes/products.js";
import cartItemRouter from "./routes/cart-items.js";
import cartRouter from "./routes/shopping-carts.js";
import orderRouter from "./routes/orders.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.URL_FRONTEND, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(productRouter);
app.use(cartItemRouter);
app.use(cartRouter);
app.use(orderRouter);

const startServer = async () => {
  await connectToDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
startServer();
