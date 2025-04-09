const { Router } = require("express");
const { asyncHandler } = require("../middlewares/async-handler");
const { carouselController } = require("../controllers/carousel.controller");
const { upload } = require("../middlewares/upload");

const carouselRoute = Router();

carouselRoute
    .route("/carousel")
    .get(asyncHandler(carouselController.getAllCarousel))
    .post(
        upload.single("content"),
        asyncHandler(carouselController.createCarousel)
    );

carouselRoute
    .route("/carousel/:id")
    .get(asyncHandler(carouselController.getCarouselById))
    .patch(
        upload.single("content"),
        asyncHandler(carouselController.updateCarousel)
    )
    .delete(asyncHandler(carouselController.deleteCarousel));

module.exports = carouselRoute;
