const { object, string, array, buffer } = require("zod");

const tutorialSchema = object({
    title: string()
        .min(1, "Title is required")
        .max(100, "Title must not exceed 100 characters"),
    description: string()
        .min(1, "Description is required")
        .max(500, "Description must not exceed 500 characters"),
    product: string()
        .min(1, "Product ID is required")
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid Product ID format"), // MongoDB ObjectId validation
    videos: array(
        object({
            path: string().min(1, "Video path is required"), // Path to the video file on disk
            filename: string().min(1, "Filename is required"), // Unique filename
            contentType: string().min(1, "Content type is required"), // MIME type of the video
        })
    )
        .min(1, "At least one video is required")
        .max(5, "You can upload up to 5 videos"),
});

module.exports = { tutorialSchema };
