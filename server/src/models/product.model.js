const { Schema, model } = require("mongoose");

// Product Schema
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    stock: { type: Number, required: true, default: 0 },
    ratings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true } );

const Product = model("Product", productSchema);

module.exports = Product;