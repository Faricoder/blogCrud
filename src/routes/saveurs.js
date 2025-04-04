const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM recettes');
        const recettes = rows.map(recette => ({
            ...recette,
            image_url: recette.image_url || null
        }));
        res.json(recettes);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router; 