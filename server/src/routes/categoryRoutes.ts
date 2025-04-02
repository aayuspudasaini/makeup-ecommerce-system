import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoryController";
import { authenticateUser } from "../middlewares/authMiddleware";


const categoryRoutes = Router();

categoryRoutes.post("/", authenticateUser, createCategory); // Only admins can create
categoryRoutes.get("/", getCategories); 

export default categoryRoutes;