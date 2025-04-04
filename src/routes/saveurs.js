const express = require('express');
const router = express.Router();
const db = require('../model/db');

// Obtenir toutes les recettes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Recettes');
        res.json(rows);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Obtenir une recette spécifique
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Recettes WHERE id_recette = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Recette non trouvée' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router; 