const { Router } = require("express");
const { CategoryController } = require("../controllers/category.controller");
const { asyncHandler } = require("../middlewares/async-handler");
const catRoute = Router();

catRoute
    .route("/category")
    .get((req, res) => res.send({ message: "Hello from category" }))
    .post(asyncHandler(CategoryController.createCategory));

module.exports = catRoute;
