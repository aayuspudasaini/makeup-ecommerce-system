const { string, object, any } = require("zod");

const categorySchema = object({
    name: string()
        .min(1, "Name is required")
        .max(16, "Name must be at least 6 characters long."),
    description: string().optional(),
    image: any(),
    // image: any()
    //     .refine((file) => file?.length >= 1, { message: "Image is required." })
    //     .refine(
    //         (file) => file?.size <= 10 * 1024 * 1024,
    //         "Max image size is 10MB."
    //     ),
    // .refine(
    //     (file) =>
    //         ["image/png", "image/jpeg", "image/jpg", "video/mp4"].includes(
    //             file?.type
    //         ),
    //     "Only .jpg, .jpeg, .png and mp4 formats are supported."
    // ),
});

module.exports = { categorySchema };
