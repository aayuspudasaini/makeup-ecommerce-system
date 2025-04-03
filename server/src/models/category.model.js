const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    image: { type: String, default: "/images/category-default-image.jpg" },
});

const Category = model("Category", categorySchema);

module.exports = Category;
