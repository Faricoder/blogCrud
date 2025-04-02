const express = require("express");

const router = express.Router();

const saveursRouter = require("./saveursRouter");

router.use("/saveurs", saveursRouter);

module.exports = router;
