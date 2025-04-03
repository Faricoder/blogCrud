const db = require("./db");

const findAll = async () => {
	try {
		const [saveurs] = await db.query("SELECT * FROM recettes");

		return saveurs;
	} catch (error) {
		console.error(err);
	}
};
const findOne = async (id) => {
	try {
		const [recette] = await db.query(
			"SELECT * FROM recettes Where id_recette = ?",
			[id_recette],
		);

		return recette;
	} catch (err) {
		console.error(err);
	}
};
module.exports = { findAll, findOne };
