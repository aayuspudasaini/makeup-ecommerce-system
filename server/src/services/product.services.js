const Product = require("../models/product.model");
const { BadRequestException } = require("../exceptions/errors.exceptions");

const productService = {
    // Fetch all products
    findAll: async () => {
        return await Product.find({});
    },

    // Create a new product
    create: async (data) => {
        return await Product.create(data);
    },

    // Find a product by ID
    findById: async (id) => {
        const product = await Product.findById(id);
        if (!product) {
            throw new BadRequestException("Product not found");
        }
        return product;
    },

    // Find products by category
    findByCategory: async (categoryId) => {
        return await Product.find({ category: categoryId });
    },

    // Update a product by ID
    update: async (id, data) => {
        const product = await Product.findByIdAndUpdate(id, data, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });
        if (!product) {
            throw new BadRequestException("Product not found");
        }
        return product;
    },

    // Delete a product by ID
    remove: async (id) => {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new BadRequestException("Product not found");
        }
        return product;
    },
};

module.exports = { productService };