const express = require("express");
const { getPoolInfo } = require("../controllers/uniswapController.js");

const router = express.Router();

router.route("/pair").get(getPoolInfo);

module.exports = router;
