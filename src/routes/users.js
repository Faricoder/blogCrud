const express = require('express');
const router = express.Router();
const db = require('../model/db');
const bcrypt = require('bcrypt');

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
    try {
        const { nom_utilisateur, email, mot_de_passe, bio } = req.body;
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        
        const [result] = await db.query(
            'INSERT INTO Utilisateurs (nom_utilisateur, email, mot_de_passe, bio) VALUES (?, ?, ?, ?)',
            [nom_utilisateur, email, hashedPassword, bio]
        );
        
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    try {
        const { nom_utilisateur, email, mot_de_passe, bio } = req.body;
        const userId = req.params.id;
        
        let updateQuery = 'UPDATE Utilisateurs SET nom_utilisateur = ?, email = ?, bio = ?';
        let queryParams = [nom_utilisateur, email, bio];
        
        if (mot_de_passe) {
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            updateQuery += ', mot_de_passe = ?';
            queryParams.push(hashedPassword);
        }
        
        updateQuery += ' WHERE id_utilisateur = ?';
        queryParams.push(userId);
        
        await db.query(updateQuery, queryParams);
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Obtenir un utilisateur par ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id_utilisateur, nom_utilisateur, email, bio FROM Utilisateurs WHERE id_utilisateur = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Connexion utilisateur
router.post('/login', async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        
        const [rows] = await db.query(
            'SELECT * FROM Utilisateurs WHERE email = ?',
            [email]
        );
        
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
        
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
        
        // Ne pas renvoyer le mot de passe
        delete user.mot_de_passe;
        res.json(user);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Supprimer d'abord les commentaires de l'utilisateur
    await db.query('DELETE FROM Commentaires WHERE id_utilisateur = ?', [userId]);
    
    // Puis supprimer l'utilisateur
    await db.query('DELETE FROM Utilisateurs WHERE id_utilisateur = ?', [userId]);
    
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router; 