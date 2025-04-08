const { Router } = require("express");
const { CategoryController } = require("../controllers/category.controller");
const { asyncHandler } = require("../middlewares/async-handler");
const catRoute = Router();
const { upload } = require("../middlewares/upload");
const { identification } = require("../middlewares/identification");

catRoute
    .route("/category")
    .get(asyncHandler(CategoryController.getAllCategory))
    .post(
        identification,
        upload.single("image"),
        asyncHandler(CategoryController.createCategory)
    );

catRoute
    .route("/category/:id")
    .get(asyncHandler(CategoryController.getCategoryById))
    .put(
        identification,
        upload.single("image"),
        asyncHandler(CategoryController.updateCategory)
    )
    .delete(identification, asyncHandler(CategoryController.deleteCategory));

module.exports = catRoute;
