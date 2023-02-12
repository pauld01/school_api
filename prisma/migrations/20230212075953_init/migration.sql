-- CreateTable
CREATE TABLE `pole` (
    `id_pole` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_pole` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_pole`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statut` (
    `id_statut` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_statut` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_statut`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promo` (
    `id_promo` INTEGER NOT NULL AUTO_INCREMENT,
    `annees_promo` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_promo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personnel` (
    `id_personnel` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_personnel` VARCHAR(50) NOT NULL,
    `prenom_personnel` VARCHAR(50) NOT NULL,
    `mail_personnel` VARCHAR(150) NOT NULL,
    `tel_personnel` VARCHAR(20) NOT NULL,
    `ville_personnel` VARCHAR(250) NOT NULL,
    `id_statut` INTEGER NOT NULL,

    INDEX `id_statut`(`id_statut`),
    PRIMARY KEY (`id_personnel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parcours` (
    `id_parcours` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_parcours` VARCHAR(75) NOT NULL,
    `programme` VARCHAR(75) NOT NULL,
    `id_personnel` INTEGER NOT NULL,
    `id_pole` INTEGER NOT NULL,

    INDEX `id_personnel`(`id_personnel`),
    INDEX `id_pole`(`id_pole`),
    PRIMARY KEY (`id_parcours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matiere` (
    `id_matiere` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_matiere` VARCHAR(50) NOT NULL,
    `id_parcours` INTEGER NOT NULL,

    INDEX `id_parcours`(`id_parcours`),
    PRIMARY KEY (`id_matiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classe` (
    `id_classe` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_classe` VARCHAR(50) NOT NULL,
    `groupe` INTEGER NOT NULL,
    `id_promo` INTEGER NOT NULL,
    `id_parcours` INTEGER NOT NULL,

    INDEX `id_promo`(`id_promo`),
    INDEX `id_parcours`(`id_parcours`),
    PRIMARY KEY (`id_classe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etudiant` (
    `id_etudiant` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_etudiant` VARCHAR(50) NOT NULL,
    `prenom_etudiant` VARCHAR(50) NOT NULL,
    `mail_etudiant` VARCHAR(150) NOT NULL,
    `tel_etudiant` VARCHAR(20) NOT NULL,
    `anneeNaissance_etudiant` INTEGER NOT NULL,
    `ville_etudiant` VARCHAR(250) NOT NULL,
    `id_classe` INTEGER NOT NULL,

    INDEX `id_classe`(`id_classe`),
    PRIMARY KEY (`id_etudiant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cours` (
    `id_cours` INTEGER NOT NULL AUTO_INCREMENT,
    `date_cours` DATE NOT NULL,
    `heure_debut` TIME NOT NULL,
    `heure_fin` TIME NOT NULL,
    `formateur` INTEGER NOT NULL,
    `id_matiere` INTEGER NOT NULL,
    `id_classe` INTEGER NOT NULL,

    INDEX `fomateur`(`formateur`),
    INDEX `id_matiere`(`id_matiere`),
    INDEX `id_classe`(`id_classe`),
    PRIMARY KEY (`id_cours`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `note` (
    `id_note` INTEGER NOT NULL AUTO_INCREMENT,
    `date_cours` DATE NOT NULL,
    `note` INTEGER NOT NULL,
    `id_etudiant` INTEGER NOT NULL,
    `id_matiere` INTEGER NOT NULL,
    `formateur` INTEGER NOT NULL,

    INDEX `id_etudiant`(`id_etudiant`),
    INDEX `id_matiere`(`id_matiere`),
    INDEX `fomateur`(`formateur`),
    PRIMARY KEY (`id_note`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `personnel` ADD CONSTRAINT `personnel_ibfk_1` FOREIGN KEY (`id_statut`) REFERENCES `statut`(`id_statut`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `parcours` ADD CONSTRAINT `parcours_ibfk_1` FOREIGN KEY (`id_personnel`) REFERENCES `personnel`(`id_personnel`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `parcours` ADD CONSTRAINT `parcours_ibfk2` FOREIGN KEY (`id_pole`) REFERENCES `pole`(`id_pole`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `matiere` ADD CONSTRAINT `matiere_ibfk_1` FOREIGN KEY (`id_parcours`) REFERENCES `parcours`(`id_parcours`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classe` ADD CONSTRAINT `classe_ibfk_1` FOREIGN KEY (`id_promo`) REFERENCES `promo`(`id_promo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `classe` ADD CONSTRAINT `classe_ibfk_2` FOREIGN KEY (`id_parcours`) REFERENCES `parcours`(`id_parcours`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `etudiant` ADD CONSTRAINT `etudiant_ibfk_1` FOREIGN KEY (`id_classe`) REFERENCES `classe`(`id_classe`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`formateur`) REFERENCES `personnel`(`id_personnel`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_2` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cours` ADD CONSTRAINT `cours_ibfk_3` FOREIGN KEY (`id_classe`) REFERENCES `classe`(`id_classe`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant`(`id_etudiant`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_ibfk_2` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_ibfk_3` FOREIGN KEY (`formateur`) REFERENCES `personnel`(`id_personnel`) ON DELETE RESTRICT ON UPDATE RESTRICT;
