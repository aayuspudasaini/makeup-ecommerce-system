const { Router } = require("express");

const catRoute = require("./category.routes");

const router = Router();

router.use("/", catRoute);

module.exports = router;
