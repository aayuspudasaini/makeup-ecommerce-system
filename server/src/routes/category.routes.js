const { Router } = require("express");
const { CategoryController } = require("../controllers/category.controller");
const { asyncHandler } = require("../middlewares/async-handler");
const catRoute = Router();
const { upload } = require("../middlewares/upload");

catRoute
    .route("/category")
    .get((req, res) => res.send({ message: "Hello from category" }))
    .post(
        upload.single("image"),
        asyncHandler(CategoryController.createCategory)
    );

module.exports = catRoute;
