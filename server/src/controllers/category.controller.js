const { HTTP_STATUS } = require("../constants/http.config");
const { categoryService } = require("../services/category.services");
const { successResponse } = require("../utils/success.response");
const { categorySchema } = require("../validations/category.validation");

async function getAllCategory(req, res, next) {
    const categories = await categoryService.findAll();
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        categories,
        "Categories fetched successfully"
    );
}

async function createCategory(req, res, next) {
    const result = categorySchema.parse({ ...req.body });

    const file = req.file;

    if (file) {
        result.image = file.path;
    }

    const data = await categoryService.create(result);

    successResponse(
        res,
        HTTP_STATUS.CREATED,
        true,
        data,
        "Category created successfully"
    );
}

module.exports.CategoryController = {
    getAllCategory,
    createCategory,
};
