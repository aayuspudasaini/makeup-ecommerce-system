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

async function createCategory(req, res) {
    const result = categorySchema.parse({ ...req.body });

    if (req.file) {
        result.image = req.file.path;
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

// async function updateCarousel(req, res) {
//     const { id } = req.params;

//     const result = carouselSchema.parse({ ...req.body });

//     if (req.file) {
//         result.url = req.file.path;
//     }

//     const data = await carouselServices.update(id, result);

//     successResponse(
//         res,
//         HTTP_STATUS.OK,
//         true,
//         data,
//         "Data Updated successfully."
//     );
// }

async function deleteCategory(req, res) {
    const { id } = req.params;
    await categoryService.remove(id);
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        undefined,
        "Data Deleted successfully."
    );
}

module.exports.CategoryController = {
    getAllCategory,
    createCategory,
    deleteCategory,
};
