import "express-async-errors"
import cors from "cors";
import { Express } from "express";

// Any other import that is from our source code should be imported here
import authRouter from "../Admin/auth/route/auth-router"
import storeRouter from "../StoreFront/route/store-router"
import productRouter from "../Products/route/product-router"
export default function (app: Express) {
  app.use(
    cors({
      origin: process.env.CORS_ALLOWED_ORIGINS?.split(","),
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type",
      exposedHeaders: "x-auth-token",
      credentials: true,
    })
  );
  app.use("/auth",authRouter);
  app.use("/store",storeRouter)
  app.use("/product",productRouter)


 
}
