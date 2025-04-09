const { HTTP_STATUS } = require("../constants/http.config");
const {
    appointmentBookingService,
} = require("../services/appointment-booking.service");
const { successResponse } = require("../utils/success.response");
const {
    appointmentBookingSchema,
    scheduleValidation,
} = require("../validations/appointment.validation");

async function getAll(req, res, next) {
    const data = await appointmentBookingService.findAll();
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        data,
        "Data fetched successfully"
    );
}

async function create(req, res) {
    const result = appointmentBookingSchema.parse({
        ...req.body,
    });

    const data = await appointmentBookingService.create(result);

    successResponse(
        res,
        HTTP_STATUS.CREATED,
        true,
        data,
        "Appointment Booked successfully"
    );
}

async function getById(req, res) {
    const { id } = req.params;
    const data = await appointmentBookingService.findById(id);
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

    const result = scheduleValidation.parse({
        ...req.body,
    });

    const data = await appointmentBookingService.update(id, result);

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
    await appointmentBookingService.remove(id);
    successResponse(
        res,
        HTTP_STATUS.OK,
        true,
        undefined,
        "Data Deleted successfully."
    );
}

module.exports.AppointmentBookingController = {
    getAll,
    create,
    getById,
    update,
    remove,
};
