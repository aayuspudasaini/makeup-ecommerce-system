const { Schema, model } = require("mongoose");

const carouselSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },
        content: {
            type: String,
        },
    },
    { timestamps: true }
);

const Carousel = model("Carousel", carouselSchema);

module.exports = Carousel;
