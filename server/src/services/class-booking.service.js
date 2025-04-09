const { BadRequestException } = require("../exceptions/errors.exceptions");
const ClassBooking = require("../models/class-booking.model");

async function findAll() {
    const data = await ClassBooking.find({}).sort({ createdAt: 1 });
    return data;
}

async function create(data) {
    const newData = await ClassBooking.create({
        ...data,
    });

    return newData;
}

async function findById(id) {
    const data = await ClassBooking.findById(id);

    if (!data) throw new BadRequestException("Data not found.");

    return data;
}

async function update(id, data) {
    const updatedData = await ClassBooking.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
    );

    if (!updatedData) throw new BadRequestException("Failed to update data.");

    return updatedData;
}
async function remove(id) {
    const deletedData = await ClassBooking.findByIdAndDelete(id);

    if (!deletedData) throw new BadRequestException("Data not found.");

    return deletedData;
}

module.exports.ClassBookingService = {
    findAll,
    create,
    remove,
    findById,
    update,
};
