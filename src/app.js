const express = require("express");
const cors = require("cors");
const path = require("path");
const saveursRouter = require('./routes/saveurs');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

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
app.use('/api/saveurs', saveursRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);

//get http:/localhost:4242/
app.get("/", (req, res) => {
	res.status(200).send("je suis en place 'http://localhost:4242");
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
