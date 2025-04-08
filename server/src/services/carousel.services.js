const {
    BadRequestException,
    NotFoundException,
} = require("../exceptions/errors.exceptions");
const Carousel = require("../models/carousel.model");

async function findAll() {
    const data = await Carousel.find({}).sort({ crearedAt: -1 });
    return data;
}

async function create(data) {
    const newCarousel = await Carousel.create({ ...data });

    if (!newCarousel) throw new BadRequestException("Failed to create data.");

    return newCarousel;
}

async function findById(id) {
    const carousel = await Carousel.findById(id);

    if (!carousel) throw new NotFoundException("Data not found.");

    return carousel;
}

async function update(id, data) {
    const updatedData = await Carousel.findByIdAndUpdate(
        id,
        {
            ...data,
        },
        { new: true }
    );

    if (!updatedData) throw new NotFoundException("Data not Found");

    return updatedData;
}

async function remove(id) {
    const data = await Carousel.findByIdAndDelete(id, { new: true });

    if (!data) throw new BadRequestException("Failed to delete data.");

    return data;
}

module.exports.carouselServices = { findAll, create, findById, update, remove };
