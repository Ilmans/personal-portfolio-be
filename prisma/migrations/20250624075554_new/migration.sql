/*
  Warnings:

  - You are about to alter the column `createdAt` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `articles` MODIFY `createdAt` DATETIME NOT NULL;
