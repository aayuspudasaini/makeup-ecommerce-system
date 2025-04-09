const { BadRequestException } = require("../exceptions/errors.exceptions");
const AppointmentBooking = require("../models/appointment-booking.model");

async function findAll() {
    const data = await AppointmentBooking.find({}).sort({ createdAt: 1 });
    return data;
}

async function create(data) {
    const isExist = await AppointmentBooking.exists({
        email: data.email,
        preferredDateTime: data.preferredDateTime,
    });
    const newData = await AppointmentBooking.create({
        ...data,
    });

    return newData;
}

async function findById(id) {
    const appointment = await AppointmentBooking.findById(id);

    if (!appointment) throw new BadRequestException("Data not found.");

    return appointment;
}

async function update(id, data) {
    const updatedData = await AppointmentBooking.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
    );

    if (!updatedData) throw new BadRequestException("Failed to update data.");

    return updatedData;
}

async function remove(id) {
    const deletedData = await AppointmentBooking.findByIdAndDelete(id);

    if (!deletedData) throw new BadRequestException("Data not found.");

    return deletedData;
}

module.exports.appointmentBookingService = {
    findAll,
    create,
    remove,
    findById,
    update,
};
