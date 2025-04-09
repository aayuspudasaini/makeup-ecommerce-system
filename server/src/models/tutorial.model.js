const { Schema, model } = require("mongoose");

const tutorialSchema = new Schema(
    {
        title: { type: String, required: true }, // Title of the tutorial
        description: { type: String, required: true }, // Description of the tutorial
        videos: [
            {
                path: { type: String, required: true }, // Path to the video file on disk
                filename: { type: String, required: true }, // Unique filename
                contentType: { type: String, required: true }, // MIME type of the video (e.g., "video/mp4")
            },
        ], // Array of videos
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to the associated product
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

const Tutorial = model("Tutorial", tutorialSchema);

module.exports = Tutorial;