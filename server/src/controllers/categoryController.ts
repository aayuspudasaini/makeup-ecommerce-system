import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";
import { asyncHandler } from "../middlewares/async-handler";
import { categorySchema } from "../validations/category.validation";
import { categoryService } from "../services/category.service";
import { HTTP_STATUS } from "../config/http.config";

export const createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

   const result = categorySchema.parse({ ...req.body });

   const data = await categoryService.create(result);

   res.status(HTTP_STATUS.CREATED).json({
      status: true,
      message: "Category created successfully",
      category: data,
   });

})

export const getCategories = async (_req: Request, res: Response) => {
   try {
      const categories = await Category.find();
      res.json(categories);
   } catch (error) {
      res.status(500).json({ message: "Server error", error });
   }
};
