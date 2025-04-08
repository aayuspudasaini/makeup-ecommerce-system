const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { upload } = require("../middlewares/upload");
const { productController } =require("../controllers/product.controller");

const prodRoute = Router();

prodRoute
    .route("/product")
    .get(asyncHandler(productController.getAllProducts))
    .post(asyncHandler(
        upload.single("url"),
        productController.createProduct)); 

prodRoute
    .route("/product/:id")
    .get(asyncHandler(productController.getProductById))
    .patch(asyncHandler(
        upload.single("url"),
        productController.updateProduct))
    .delete(asyncHandler(productController.deleteProduct));

prodRoute.route("/product/category").get(asyncHandler(productController.getProductsByCategory));


module.exports = prodRoute;
