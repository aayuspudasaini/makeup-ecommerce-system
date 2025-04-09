const { z, string, object } = require("zod");

const carouselSchema = object({
    title: string().min(1, "Title is required."),
    description: string().min(1, "Description is required."),
    type: z.enum(["image", "video"]),
    content: z.any().optional(),
});

module.exports = { carouselSchema };
