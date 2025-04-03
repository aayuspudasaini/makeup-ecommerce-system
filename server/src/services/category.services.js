const { BadRequestException } = require("../exceptions/errors.exceptions");
const { Category } = require("../models/category.model");
const { slugify } = require("../utils/slugify");

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

module.exports.categoryService = {
    create,
};
