const db = require("./db");

const findAll = async () => {
	try {
		const [saveurs] = await db.query("SELECT * FROM recettes");

		return saveurs;
	} catch (error) {
		console.error(err);
	}
};
module.exports = { findAll };
