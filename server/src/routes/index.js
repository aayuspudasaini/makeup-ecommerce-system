const { Router } = require("express");

const catRoute = require("./category.routes");
const bookroute = require("./booking.routes")
const userRoute = require("./user.routes")
// const prodRoute = require("./product.routes");

const router = Router();

router.use("/", catRoute);
router.use("/booking", bookroute)
router.use("/user", userRoute);
// router.use("/product", prodRoute);

module.exports = router;
