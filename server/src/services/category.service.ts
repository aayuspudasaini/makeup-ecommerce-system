import { slugify } from '../common/utils/slugify';
import { CategoryDto } from "../common/interface/category.interface";
import Category from "../models/category.model";
import { ConflictException } from '../exceptions/errors.exceptions';

async function create(data: CategoryDto) {
    // checking if category exists or not
    const isExists = await Category.exists({ slug: slugify(data.name) });

    if (isExists) throw new ConflictException("Category Already exists");

    const newCategory = await Category.create({
        slug: slugify(data.name),
        ...data
    });

    return newCategory;

}

export const categoryService = {
    create,
}