import { createProduct } from './../controller/product-controller';
import { isAuthenticated } from './../../middleware/auth';

import express from "express";
const router = express.Router();

router.post("/create-product",isAuthenticated,createProduct)

export default router