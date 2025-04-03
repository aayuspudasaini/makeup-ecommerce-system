const { HTTP_STATUS } = require("../constants/http.config");
const { categoryService } = require("../services/category.services");
const { successResponse } = require("../utils/success.response");
const { categorySchema } = require("../validations/category.validation");

async function GetAllCategory(req, res, next) {}

async function createCategory(req, res, next) {
    const result = categorySchema.parse({ ...req.body });

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
    createCategory,
};
