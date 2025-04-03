const { findAll, findOne } = require("../model/saveursModel");
const browse = async (req, res) => {
	try {
		const saveurs = await findAll();
		res.status(200).json(saveurs);
	} catch (error) {
		res.sendStatus(500);
	}
};
const read = async (req, res) => {
	try {
		if (isNan(req.params.id)) {
			throw new Error();
		}

		const recettesId = parseInt(req.params.id, 10);
		const recettes = await findOne(recettesId);
		res.status(200).json(recettes);
		console.log(recettes);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
};

module.exports = { browse, read };
