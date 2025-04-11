const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { upload } = require("../middlewares/upload");
const { productController } = require("../controllers/product.controller");

const prodRoute = Router();

prodRoute
    .route("/")
    .get(asyncHandler(productController.getAllProducts))
    .post(
        upload.array("images", 5),
        asyncHandler(productController.createProduct)
    );

prodRoute
    .route("/:id")
    .get(asyncHandler(productController.getProductById))
    .patch(
        upload.single("images"),
        asyncHandler(productController.updateProduct)
    )
    .delete(asyncHandler(productController.deleteProduct));

prodRoute
    .route("/category")
    .get(asyncHandler(productController.getProductsByCategory));

module.exports = prodRoute;
