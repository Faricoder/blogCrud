require("dotenv").config();
const app = require("./src/app");

const PORT = 4242;
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
