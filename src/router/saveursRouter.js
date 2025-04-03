const express = require("express");
const db = require("../model/db");

const router = express.Router();

const { browse } = require("../controller/saveursController.js");
//get http://localhost:4242/api/saveurs/
router.get("/", browse);

// const recettesRouter = require("./saveursRouter");

module.exports = router;

// async (req, res) => {
// 	const [saveurs] = await db.query("SELECT * FROM recettes");

// 	res.json(saveurs);
// };
