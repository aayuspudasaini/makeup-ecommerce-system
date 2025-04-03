const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
   name: { type: String, required: true, unique: true },
   slug: { type: String },
   description: { type: String },
   image: { type: String, required: false },
});

const Category = model("Category", categorySchema);

module.exports = Category;
