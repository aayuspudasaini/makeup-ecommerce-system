const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { tutorialController } = require("../controllers/tutorial.controller");
const { upload } = require("../middlewares/upload");

const tutoRoute = Router();

tutoRoute
    .route("/tutorial")
    .get(asyncHandler(tutorialController.getAllTutorials)) // Fetch all tutorials
    .post(
        upload.array("videos", 5), // Use Multer to handle up to 5 video uploads
        asyncHandler(tutorialController.createTutorial) // Create a tutorial
    );

tutoRoute
    .route("/tutorial/:id")
    .delete(asyncHandler(tutorialController.deleteTutorial)); 

module.exports = tutoRoute;