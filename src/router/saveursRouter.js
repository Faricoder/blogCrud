const express = require("express");
const db = require("../model/db");

const router = express.Router();

//get http://localhost:4242/api/saveurs/
router.get("/", async (req, res) => {
	const { saveurs } = await db.query("SELECT * FROM saveurs.recettes");
	res.json(saveurs);
});

const recettesRouter = require("./saveursRouter");

module.exports = router;
