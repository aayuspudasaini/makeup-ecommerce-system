const { HTTP_STATUS } = require("../constants/http.config");
const { ClassBookingService } = require("../services/class-booking.service");
const { successResponse } = require("../utils/success.response");
const { classBookingSchema } = require("../validations/class.validation");

async function getAll(req, res, next) {
    const data = await ClassBookingService.findAll();
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data fetched successfully"
    );
}

async function create(req, res) {
    const result = classBookingSchema.parse({ ...req.body });

    const data = await ClassBookingService.create(result);

    successResponse(
        res,
        HTTP_STATUS.CREATED,
        true,
        data,
        "Class Booked successfully"
    );
}

async function getById(req, res) {
    const { id } = req.params;
    const data = await ClassBookingService.findById(id);
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data Fetched Successfully"
    );
}

async function update(req, res) {
    const { id } = req.params;

    const result = classBookingSchema.parse({ ...req.body });

    const data = await ClassBookingService.update(id, result);

    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data Updated successfully."
    );
}

async function remove(req, res) {
    const { id } = req.params;
    await ClassBookingService.remove(id);
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        undefined,
        "Data Deleted successfully."
    );
}

module.exports.ClassBookingController = {
    getAll,
    create,
    getById,
    update,
    remove,
};
