const { HTTP_STATUS } = require("../constants/http.config");
const { carouselServices } = require("../services/carousel.services");
const { successResponse } = require("../utils/success.response");
const { carouselSchema } = require("../validations/carousel.validation");

async function getAllCarousel(req, res) {
    const data = await carouselServices.findAll();
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data Fetched Successfully"
    );
}

async function createCarousel(req, res) {
    const result = carouselSchema.parse({ ...req.body });

    if (req.file) {
        result.content = req.file.path;
    }

    const data = await carouselServices.create(result);

    successResponse(
        res,
        HTTP_STATUS.CREATED,
        true,
        data,
        "Data created successfully."
    );
}

async function getCarouselById(req, res) {
    const { id } = req.params;
    const data = await carouselServices.findById(id);
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data Fetched Successfully"
    );
}

async function updateCarousel(req, res) {
    const { id } = req.params;

    const result = carouselSchema.parse({ ...req.body });

    if (req.file) {
        result.url = req.file.path;
    }

    const data = await carouselServices.update(id, result);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data Updated successfully."
    );
}

async function deleteCarousel(req, res) {
    const { id } = req.params;
    const data = await carouselServices.remove(id);
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        undefined,
        "Data Deleted successfully."
    );
}

module.exports.carouselController = {
    getAllCarousel,
    createCarousel,
    getCarouselById,
    updateCarousel,
    deleteCarousel,
};
