const { findAll } = require("../model/saveursModel");
const browse = async (req, res) => {
	try {
		const saveurs = await findAll();
		res.status(200).json(saveurs);
	} catch (error) {
		res.sendStatus(500);
	}
};

module.exports = { browse };
