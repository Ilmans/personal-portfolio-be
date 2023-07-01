/*
  Warnings:

  - You are about to alter the column `createdAt` on the `articles` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[slug]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `articles` MODIFY `createdAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `articles_slug_key` ON `articles`(`slug`);
