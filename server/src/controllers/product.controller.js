const { HTTP_STATUS } = require("../constants/http.config");
const { productService } = require("../services/product.services");
const { successResponse } = require("../utils/success.response");
const { productSchema } = require("../validations/product.validation");

async function getAllProducts(req, res, next) {
        const data = await productService.findAll(req.query);
        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Products fetched successfully"
        );
}

async function createProduct(req, res, next) {
        // Validate the request body
        console.log("product data", req.body)
        const validatedData = productSchema.parse({...req.body});

        // Create the product
        const data = await productService.create(validatedData);

        successResponse(
            res,
            HTTP_STATUS.CREATED,
            true,
            data,
            "Product created successfully"
        );
}

async function getProductById(req, res, next) {
        const { id } = req.params;

        const data = await productService.findById(id);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Product fetched successfully"
        );
}

async function getProductsByCategory(req, res, next) {
        const { categoryId } = req.params;

        const data = await productService.findByCategory(categoryId);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Products fetched successfully by category"
        );
}

async function updateProduct(req, res, next) {
        const { id } = req.params;

        // Validate the request body
        const validatedData = productSchema.parse({...req.body});

        const data = await productService.update(id, validatedData);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Product updated successfully"
        );
}

async function deleteProduct(req, res, next) {
        const { id } = req.params;

        await productService.remove(id);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            null,
            "Product deleted successfully"
        );
}

module.exports.productController = {
    getAllProducts,
    createProduct,
    getProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
};