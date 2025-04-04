const { Router } = require("express");

const catRoute = require("./category.routes");
const bookroute = require("./booking.routes");
const carouselRoute = require("./carousel.routes");

const router = Router();

router.use("/", catRoute);
router.use("/booking", bookroute);

router.use("/", carouselRoute);

module.exports = router;
