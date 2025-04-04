const { Router } = require("express");
const { CategoryController } = require("../controllers/category.controller");
const { asyncHandler } = require("../middlewares/async-handler");
const catRoute = Router();
const { upload } = require("../middlewares/upload");

catRoute
    .route("/category")
    .get(asyncHandler(CategoryController.getAllCategory))
    .post(
        upload.single("image"),
        asyncHandler(CategoryController.createCategory)
    );

catRoute
    .route("/category/:id")
    .get(asyncHandler(CategoryController.getCategoryById))
    .put(
        upload.single("image"),
        asyncHandler(CategoryController.updateCategory)
    )
    .delete(asyncHandler(CategoryController.deleteCategory));

module.exports = catRoute;
