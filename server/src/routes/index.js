const { Router } = require("express");

const catRoute = require("./category.routes");
const carouselRoute = require("./carousel.routes");
const bookroute = require("./booking.routes");
const userRoute = require("./user.routes");

const router = Router();

router.use("/", catRoute);
router.use("/booking", bookroute);

router.use("/", carouselRoute);
router.use("/user", userRoute);

module.exports = router;
