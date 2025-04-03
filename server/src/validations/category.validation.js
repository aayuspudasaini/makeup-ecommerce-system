const { string, object } = require("zod");

const categorySchema = object({
    name: string()
        .min(1, "Name is required")
        .max(16, "Name must be at least 6 characters long."),
    description: string().optional(),
    image: string().optional(),
});

module.exports = { categorySchema };
