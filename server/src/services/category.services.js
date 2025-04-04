const { BadRequestException } = require("../exceptions/errors.exceptions");
const { Category } = require("../models/category.model");
const { slugify } = require("../utils/slugify");

async function findAll() {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return categories;
}

async function create(data) {
    // checking if category exists
    const slug = slugify(data.name);

    const isExist = await Category.exists({ slug });

    if (isExist) throw new BadRequestException("Category Already exists.");

    const newData = await Category.create({
        slug,
        ...data,
    });

    return newData;
}

async function getBySlug(slug) {
    const categories = await Category.find({ slug });
    if (!categories) throw new BadRequestException("Category not found.");
    return categories;
}

async function getById(id) {
    const category = await Category.findById(id);

    if (!category) throw new BadRequestException("Category not found.");

    return category;
}

async function update(id, data) {
    const slug = slugify(data.name);

    const isExist = await Category.exists({ slug });

    if (isExist) throw new BadRequestException("Category Already exists.");

    const updatedData = await Category.findByIdAndUpdate(
        id,
        { slug, ...data },
        { new: true }
    );

    return updatedData;
}
async function remove(id) {
    const deletedData = await Category.findByIdAndDelete(id);

    if (!deletedData) throw new BadRequestException("Category not found.");

    return deletedData;
}

module.exports.categoryService = {
    findAll,
    create,
};
