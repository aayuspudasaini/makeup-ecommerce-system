const { Schema, model } = require("mongoose");

// Product Schema
const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        images: { type: String },
    },
    { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
