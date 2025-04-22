import express from "express"
import cors from "cors";
import { connectToDB } from "./lib/db.js"
import 'dotenv/config';
import authRouter from "./routes/auth.js";
import './lib/redis.js';
import productRouter from "./routes/product.js";



const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.URL_FRONTEND, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(authRouter)
app.use(productRouter)


const startServer = async () => {
  await connectToDB()
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}
startServer()