const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { upload } = require("../middlewares/upload");
const { productController } = require("../controllers/product.controller");

const prodRoute = Router();

prodRoute
    .route("/")
    .get(asyncHandler(productController.getAllProducts))
    .post(upload.single("url"), asyncHandler(productController.createProduct));

prodRoute
    .route("/:id")
    .get(asyncHandler(productController.getProductById))
    .patch(upload.single("url"),asyncHandler( productController.updateProduct))
    .delete(asyncHandler(productController.deleteProduct));

prodRoute
    .route("/category")
    .get(asyncHandler(productController.getProductsByCategory));

module.exports = prodRoute;
