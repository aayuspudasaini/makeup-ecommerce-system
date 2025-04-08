const { object, string, number } = require("zod");

const productSchema = object({
    name: string()
        .min(1, "Product name is required")
        .max(100, "Product name must not exceed 100 characters"),
    description: string()
        .min(1, "Product description is required")
        .max(500, "Product description must not exceed 500 characters"),
    price: number()
        .positive("Price must be a positive number")
        .min(0.01, "Price must be at least 0.01"),
    category: string()
        .min(1, "Category ID is required")
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid Category ID format"), // MongoDB ObjectId validation
});

module.exports = { productSchema };
