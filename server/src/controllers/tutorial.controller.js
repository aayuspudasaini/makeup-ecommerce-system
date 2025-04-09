const { HTTP_STATUS } = require("../constants/http.config");
const { tutorialService } = require("../services/tutorial.service");
const { successResponse } = require("../utils/success.response");
const { tutorialSchema } = require("../validations/tutorial.validation");
const fs = require("fs");
const path = require("path");

async function getAllTutorials(req, res, next) {
        const { productId } = req.query; // Optional query param to filter by product

        let data;
        if (productId) {
            // Fetch tutorials by product
            data = await tutorialService.findByProduct(productId);
        } else {
            // Fetch all tutorials
            data = await tutorialService.findAll();
        }

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            data,
            "Tutorials fetched successfully"
        );
}

async function createTutorial(req, res, next) {
        const { title, description, product } = req.body;

        // Process uploaded videos
        const videos = req.files.map((file) => ({
            path: file.path, // Path to the uploaded file on disk
            filename: file.filename, // Unique filename
            contentType: file.mimetype, // MIME type of the file
        }));

        // Validate the request body
        const validatedData = tutorialSchema.parse({
            title,
            description,
            product,
            videos,
        });

        // Create the tutorial
        const data = await tutorialService.create(validatedData);

        successResponse(
            res,
            HTTP_STATUS.CREATED,
            true,
            data,
            "Tutorial created successfully"
        );
    
}

async function deleteTutorial(req, res, next) {
        const { id } = req.params; // Tutorial ID from the request parameters

        // Find the tutorial by ID
        const tutorial = await tutorialService.findById(id);
        if (!tutorial) {
            return res.status(404).json({
                success: false,
                message: "Tutorial not found",
            });
        }

        // Delete associated video files from disk
        tutorial.videos.forEach((video) => {
            const filePath = path.resolve(video.path);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Remove the file
            }
        });

        // Delete the tutorial from the database
        await tutorialService.remove(id);

        successResponse(
            res,
            HTTP_STATUS.OK,
            true,
            null,
            "Tutorial deleted successfully"
        );
    
}

module.exports.tutorialController = {
    getAllTutorials,
    createTutorial,
    deleteTutorial
};