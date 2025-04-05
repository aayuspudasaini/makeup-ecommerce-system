const { Router } = require("express");

const catRoute = require("./category.routes");
const bookroute = require("./booking.routes");
const userRoute = require("./user.routes");
const carouselRoute = require("./carousel.routes");
const { upload } = require("../middlewares/upload");

const router = Router();

router.use("/", catRoute);
router.use("/booking", bookroute);

router.use("/", carouselRoute);
router.use("/", userRoute);

// router.use("/product", prodRoute);

module.exports = router;
