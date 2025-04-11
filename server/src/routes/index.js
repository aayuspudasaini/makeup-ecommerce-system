const { Router } = require("express");

const catRoute = require("./category.routes");
// const bookroute = require("./booking.routes");
const userRoute = require("./user.routes");
const carouselRoute = require("./carousel.routes");
const prodRoute = require("./product.routes");
const appointment = require("./appointment-booking.routes");
const tutoRoute = require("./tutorial.routes");
const classRoutes = require("./class-booking.routes");
const paymentRoute = require("./payment.route");

const router = Router();

router.use("/", catRoute);
router.use("/", carouselRoute);
router.use("/", userRoute);
router.use("/products", prodRoute);
router.use("/appointment", appointment);
router.use("/class", classRoutes);
router.use("/", tutoRoute);
router.use("/", paymentRoute)

module.exports = router;
