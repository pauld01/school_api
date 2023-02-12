/*
  Warnings:

  - You are about to drop the column `date_cours` on the `note` table. All the data in the column will be lost.
  - Added the required column `date_note` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `note` DROP COLUMN `date_cours`,
    ADD COLUMN `date_note` DATE NOT NULL;
