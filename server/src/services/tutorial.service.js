const Tutorial = require("../models/tutorial.model");
const { BadRequestException } = require("../exceptions/errors.exceptions");

const tutorialService = {
    // Fetch all tutorials
    findAll: async () => {
        return await Tutorial.find({});
    },

    // Fetch tutorials by product ID
    findByProduct: async (productId) => {
        if (!productId) {
            throw new BadRequestException("Product ID is required");
        }
        return await Tutorial.find({ product: productId });
    },

    // Find a tutorial by ID
    findById: async (id) => {
        if (!id) {
            throw new BadRequestException("Tutorial ID is required");
        }
        const tutorial = await Tutorial.findById(id);
        if (!tutorial) {
            throw new BadRequestException("Tutorial not found");
        }
        return tutorial;
    },

    // Create a new tutorial
    create: async (data) => {
        if (!data.title || !data.description || !data.product) {
            throw new BadRequestException(
                "Title, description, and product are required"
            );
        }
        return await Tutorial.create(data);
    },

    // Remove a tutorial by ID
    remove: async (id) => {
        if (!id) {
            throw new BadRequestException("Tutorial ID is required");
        }
        const tutorial = await Tutorial.findById(id);
        if (!tutorial) {
            throw new BadRequestException("Tutorial not found");
        }
        return await Tutorial.findByIdAndDelete(id);
    },
};

module.exports = { tutorialService };
