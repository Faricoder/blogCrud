-- Sélectionner la base de données
USE saveurs;

-- Création de la table Utilisateurs
CREATE TABLE Utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    bio TEXT,
    date_inscription DATE NOT NULL DEFAULT (CURRENT_DATE)
);

-- Création de la table Recettes
CREATE TABLE Recettes (
    id_recette INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    temps_preparation INT NOT NULL,
    temps_cuisson INT NOT NULL,
    difficulte ENUM('facile', 'moyen', 'difficile') NOT NULL,
    saison VARCHAR(20) NOT NULL,
    image_url VARCHAR(255),
    date_publication DATE NOT NULL DEFAULT (CURRENT_DATE)
);

-- Création de la table Commentaires
CREATE TABLE Commentaires (
    id_commentaire INT AUTO_INCREMENT PRIMARY KEY,
    id_recette INT NOT NULL,
    id_utilisateur INT NOT NULL,
    contenu TEXT NOT NULL,
    date_commentaire DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_recette) REFERENCES Recettes(id_recette),
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateurs(id_utilisateur)
);

-- Création de la table Évaluations
CREATE TABLE Évaluations (
    id_evaluation INT AUTO_INCREMENT PRIMARY KEY,
    id_recette INT NOT NULL,
    id_utilisateur INT NOT NULL,
    note INT CHECK (note >= 1 AND note <= 5) NOT NULL,
    date_evaluation DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_recette) REFERENCES Recettes(id_recette),
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateurs(id_utilisateur)
);

-- Insérer des recettes
INSERT INTO Recettes (titre, description, instructions, temps_preparation, temps_cuisson, difficulte, saison, image_url) VALUES
('Salade Niçoise', 'Une salade composée de légumes frais et de thon.', 'Mélanger les légumes et le thon avec une vinaigrette.', 20, 0, 'moyen', 'printemps', 'salade-nicoise.jpg'),
('Asperges à la Sauce Hollandaise', 'Asperges fraîches avec une sauce crémeuse.', 'Cuire les asperges et préparer la sauce hollandaise.', 15, 10, 'facile', 'printemps', 'asperges-sauce-hollandaise.jpg'),
('Ratatouille', 'Un ragoût de légumes méditerranéens.', 'Faire revenir les légumes et cuire lentement.', 30, 40, 'moyen', 'printemps', 'ratatouille.jpg'),
('Quiche Lorraine', 'Une tarte salée avec du lard et de la crème.', 'Préparer la pâte, ajouter la garniture et cuire au four.', 25, 35, 'moyen', 'printemps', 'quiche-lorraine.jpg'),
('Soupe au Pistou', 'Une soupe provençale aux légumes et au basilic.', 'Cuire les légumes et ajouter le pistou avant de servir.', 30, 45, 'facile', 'printemps', 'soupe-pistou.jpg'),
('Tarte aux Fraises', 'Une tarte sucrée avec des fraises fraîches.', 'Préparer la pâte, ajouter la crème et les fraises.', 20, 25, 'facile', 'printemps', 'tarte-fraises.jpg');

-- Insérer des utilisateurs
INSERT INTO Utilisateurs (nom_utilisateur, email, mot_de_passe, bio) VALUES
('julie_gourmet', 'julie@example.com', 'password1', 'Amoureuse de la cuisine française.'),
('pierre_chef', 'pierre@example.com', 'password2', 'Cuisinier amateur passionné.'),
('sophie_foodie', 'sophie@example.com', 'password3', 'Adore découvrir de nouvelles recettes.'),
('marc_epicure', 'marc@example.com', 'password4', 'Toujours à la recherche de nouvelles saveurs.'),
('claire_gastro', 'claire@example.com', 'password5', 'Passionnée par la pâtisserie.'),
('luc_marmiton', 'luc@example.com', 'password6', 'Aime cuisiner pour les amis et la famille.'),
('emma_saveurs', 'emma@example.com', 'password7', 'Adore les plats de saison.'),
('antoine_cuisto', 'antoine@example.com', 'password8', 'Cuisinier en herbe.'),
('laura_delice', 'laura@example.com', 'password9', 'Amoureuse des desserts.'),
('olivier_gourmand', 'olivier@example.com', 'password10', 'Passionné par la cuisine traditionnelle.'),
('chloe_epices', 'chloe@example.com', 'password11', 'Adore expérimenter avec les épices.'),
('thomas_chef', 'thomas@example.com', 'password12', 'Cuisinier amateur enthousiaste.'),
('alice_food', 'alice@example.com', 'password13', 'Toujours à la recherche de nouvelles idées.'),
('vincent_gastro', 'vincent@example.com', 'password14', 'Passionné par la cuisine gastronomique.'),
('marie_saveurs', 'marie@example.com', 'password15', 'Adore les plats simples et savoureux.'),
('jean_epicure', 'jean@example.com', 'password16', 'Aime découvrir de nouvelles recettes.'),
('louise_cuisine', 'louise@example.com', 'password17', 'Passionnée par la cuisine saine.'),
('paul_marmiton', 'paul@example.com', 'password18', 'Cuisinier amateur créatif.'),
('elise_delice', 'elise@example.com', 'password19', 'Adore les desserts faits maison.'),
('mathieu_gourmet', 'mathieu@example.com', 'password20', 'Passionné par la cuisine française.');
