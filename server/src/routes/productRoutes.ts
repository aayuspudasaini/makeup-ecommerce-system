import { Router } from "express";
import {
   createProduct,
   getProductsByCategory,
} from "../controllers/productController";
import { authenticateUser } from "../middlewares/authMiddleware";

const productRoutes = Router();

productRoutes.post("/", authenticateUser, createProduct); // Only admin can add products
productRoutes.get("/:categoryId", getProductsByCategory); // Get products by category

export default productRoutes;
