CREATE DATABASE IF NOT EXISTS school_appli;

USE school_appli;

CREATE TABLE IF NOT EXISTS pole(
    id_pole INT auto_increment PRIMARY KEY NOT NULL,
    nom_pole VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS statut(
    id_statut INT auto_increment PRIMARY KEY NOT NULL,
    nom_statut VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS promo(
    id_promo INT auto_increment PRIMARY KEY NOT NULL,
    annees_promo VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS personnel(
    id_personnel INT auto_increment PRIMARY KEY NOT NULL,
    nom_personnel VARCHAR(50) NOT NULL,
    prenom_personnel VARCHAR(50) NOT NULL,
    mail_personnel VARCHAR(150),
    tel_personnel VARCHAR(20),
    ville_personnel VARCHAR(250), 
    id_statut INT NOT NULL,
    FOREIGN KEY (id_statut) REFERENCES statut(id_statut)
);

CREATE TABLE IF NOT EXISTS parcours(
    id_parcours INT auto_increment PRIMARY KEY NOT NULL,
    nom_parcours VARCHAR(75) NOT NULL,
    programme VARCHAR(75) NOT NULL,
    responsable INT NOT NULL, 
    id_pole INT NOT NULL,
    FOREIGN KEY (responsable) REFERENCES personnel(id_personnel),
    FOREIGN KEY (id_pole) REFERENCES pole(id_pole)
);

CREATE TABLE IF NOT EXISTS matiere(
    id_matiere INT auto_increment PRIMARY KEY NOT NULL,
    nom_matiere VARCHAR(50),
    id_parcours INT NOT NULL, 
    FOREIGN KEY (id_parcours) REFERENCES parcours(id_parcours)
);

CREATE TABLE IF NOT EXISTS classe(
    id_classe INT auto_increment PRIMARY KEY NOT NULL,
    nom_classe VARCHAR(50),
    groupe INT,
    id_promo INT NOT NULL,
    id_parcours INT NOT NULL,
    FOREIGN KEY (id_promo) REFERENCES promo(id_promo),
    FOREIGN KEY (id_parcours) REFERENCES parcours(id_parcours) 
);

CREATE TABLE IF NOT EXISTS etudiant(
    id_etudiant INT auto_increment PRIMARY KEY NOT NULL,
    nom_etudiant VARCHAR(50) NOT NULL,
    prenom_etudiant VARCHAR(50) NOT NULL,
    mail_etudiant VARCHAR(150),
    tel_etudiant VARCHAR(20),
    anneeNaissance_etudiant INT,
    ville_etudiant VARCHAR(250),
    id_classe INT NOT NULL,
    FOREIGN KEY (id_classe) REFERENCES classe(id_classe)
);

CREATE TABLE IF NOT EXISTS cours(
    id_cours INT auto_increment PRIMARY KEY NOT NULL,
    date_cours DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    formateur INT NOT NULL,
    id_matiere INT NOT NULL,
    id_classe INT NOT NULL, 
    FOREIGN KEY (formateur) REFERENCES personnel(id_personnel),
    FOREIGN KEY (id_matiere) REFERENCES matiere(id_matiere),
    FOREIGN KEY (id_classe) REFERENCES classe(id_classe)
);

CREATE TABLE IF NOT EXISTS note(
    id_note INT auto_increment PRIMARY KEY NOT NULL, 
    date_note DATE NOT NULL, 
    note INT NOT NULL, 
    id_etudiant INT NOT NULL, 
    id_matiere INT NOT NULL, 
    formateur INT NOT NULL, 
    FOREIGN KEY (id_etudiant) REFERENCES etudiant(id_etudiant),
    FOREIGN KEY (id_matiere) REFERENCES matiere(id_matiere),
    FOREIGN KEY (formateur) REFERENCES personnel(id_personnel)
);

