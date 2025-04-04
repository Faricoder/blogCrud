const express = require('express');
const router = express.Router();
const db = require('../model/db');

// Ajouter des commentaires de test
const addTestComments = async () => {
  try {
    // Vérifier si les commentaires existent déjà
    const [existingComments] = await db.query('SELECT * FROM Commentaires');
    if (existingComments.length === 0) {
      const testComments = [
        {
          id_recette: 1,
          id_utilisateur: 1,
          contenu: 'Super recette ! J\'ai adoré la préparation.'
        },
        {
          id_recette: 1,
          id_utilisateur: 2,
          contenu: 'Très bon, je recommande !'
        },
        {
          id_recette: 2,
          id_utilisateur: 3,
          contenu: 'Parfait pour un dîner entre amis.'
        }
      ];

      for (const comment of testComments) {
        await db.query(
          'INSERT INTO Commentaires (id_recette, id_utilisateur, contenu) VALUES (?, ?, ?)',
          [comment.id_recette, comment.id_utilisateur, comment.contenu]
        );
      }
      console.log('Commentaires de test ajoutés avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des commentaires de test:', error);
  }
};

// Appeler la fonction pour ajouter les commentaires de test
addTestComments();

// Obtenir tous les commentaires d'une recette
router.get('/:recetteId', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT c.*, u.nom_utilisateur 
            FROM Commentaires c
            JOIN Utilisateurs u ON c.id_utilisateur = u.id_utilisateur
            WHERE c.id_recette = ?
            ORDER BY c.date_commentaire DESC
        `, [req.params.recetteId]);
        
        res.json(rows);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Créer un nouveau commentaire
router.post('/', async (req, res) => {
    try {
        const { id_recette, id_utilisateur, contenu } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO Commentaires (id_recette, id_utilisateur, contenu) VALUES (?, ?, ?)',
            [id_recette, id_utilisateur, contenu]
        );
        
        // Récupérer le commentaire avec le nom d'utilisateur
        const [rows] = await db.query(`
            SELECT c.*, u.nom_utilisateur 
            FROM Commentaires c
            JOIN Utilisateurs u ON c.id_utilisateur = u.id_utilisateur
            WHERE c.id_commentaire = ?
        `, [result.insertId]);
        
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Mettre à jour un commentaire
router.put('/:id', async (req, res) => {
    try {
        const { contenu } = req.body;
        
        await db.query(
            'UPDATE Commentaires SET contenu = ? WHERE id_commentaire = ?',
            [contenu, req.params.id]
        );
        
        // Récupérer le commentaire mis à jour avec le nom d'utilisateur
        const [rows] = await db.query(`
            SELECT c.*, u.nom_utilisateur 
            FROM Commentaires c
            JOIN Utilisateurs u ON c.id_utilisateur = u.id_utilisateur
            WHERE c.id_commentaire = ?
        `, [req.params.id]);
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Supprimer un commentaire
router.delete('/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Commentaires WHERE id_commentaire = ?',
            [req.params.id]
        );
        
        res.json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router; 