const db = require("./db");

const findAll = async () => {
	try {
		const [saveurs] = await db.query("SELECT * FROM recettes");

		return saveurs;
	} catch (error) {
		console.error(error);
	}
};
const findOne = async (id) => {
	try {
		const [recette] = await db.query(
			"SELECT * FROM recettes WHERE id_recette = ?",
			[id]
		);

		return recette;
	} catch (err) {
		console.error(err);
	}
};
module.exports = { findAll, findOne };
