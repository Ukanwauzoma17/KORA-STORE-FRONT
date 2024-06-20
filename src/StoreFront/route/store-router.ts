import { isAuthenticated } from './../../middleware/auth';
import { createStore, deleteStore } from '../controller/store-front-controller';

import express from "express";
const router = express.Router();

router.post("/create-store",isAuthenticated,createStore)
router.post("/delete-store",isAuthenticated,deleteStore)

export default router