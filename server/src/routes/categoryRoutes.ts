import { Router } from "express";
import {
   createCategory,
   getCategories,
} from "../controllers/categoryController";

const categoryRoutes = Router();

categoryRoutes.get("/", (req, res) => {
   return res.send({ message: "Hello" })
})

categoryRoutes.post("/", createCategory); // Only admins can create
// categoryRoutes.get("/", getCategories);

export default categoryRoutes;
