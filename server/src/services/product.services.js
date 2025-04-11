const Product = require("../models/product.model");
const {
    BadRequestException,
    NotFoundException,
} = require("../exceptions/errors.exceptions");
const { Category } = require("../models/category.model");

const productService = {
    // Fetch all products
    findAll: async () => {
        return await Product.find({});
        // const {
        //     minPrice,
        //     maxPrice,
        //     category,
        //     sortBy = "createdAt",
        //     order = "desc",
        //     page = 1,
        //     limit = 10,
        // } = queryParams;

        // // Build the query object
        // const query = {};

        // // Filter by price range
        // if (minPrice || maxPrice) {
        //     query.price = {};
        //     if (minPrice) query.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
        //     if (maxPrice) query.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
        // }

        // // Filter by category
        // if (category) {
        //     query.category = category;
        // }

        //    // Pagination
        //    const skip = (parseInt(page) - 1) * parseInt(limit);

        //    // Sorting
        //    const sortOrder = order === "asc" ? 1 : -1;

        //    // Execute the query
        //    const products = await Product.find(query)
        //        .sort({ [sortBy]: sortOrder }) // Apply sorting
        //        .skip(skip) // Apply pagination
        //        .limit(parseInt(limit)); // Limit the number of results

        //    // Get the total count of matching documents
        //    const total = await Product.countDocuments(query);

        //    return {
        //        products,
        //        total,
        //        page: parseInt(page),
        //        limit: parseInt(limit),
        //    };
    },

    // Create a new product
    create: async (data) => {
        const { category } = data;

        const catExists = await Category.exists({ _id: category });

        if (!catExists) throw new NotFoundException("Invalid Category Id");

        const newProd = await Product.create({
            ...data,
            category: catExists._id,
        });

        return newProd;
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
