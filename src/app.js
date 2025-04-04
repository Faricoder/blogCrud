const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Configuration CORS plus sécurisée
const corsOptions = {
	origin: 'http://localhost:5173', // Port par défaut de Vite
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuration pour servir les fichiers statiques
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Vos routes
app.use('/api/saveurs', require('./routes/saveurs'));

//get http:/localhost:4242/
app.get("/", (req, res) => {
	res.status(200).send("je suis en place 'http://localhost:4242");
});

module.exports = app;
