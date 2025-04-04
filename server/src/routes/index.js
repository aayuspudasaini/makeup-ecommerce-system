const { Router } = require("express");

const catRoute = require("./category.routes");
const bookroute = require("./booking.routes")

const router = Router();

router.use("/", catRoute);
router.use("/booking", bookroute)

module.exports = router;
