import { Request, Response } from "express";
import Product from "../model/product";
import Category from "../model/category";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, categoryId, image } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) return res.status(400).json({ message: "Invalid category" });

        const newProduct = new Product({ name, description, price, category: category._id, image });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;

        const products = await Product.find({ category: categoryId }).populate("category");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
