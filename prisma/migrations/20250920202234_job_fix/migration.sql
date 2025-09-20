/*
  Warnings:

  - The primary key for the `application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `jobId` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobId_fkey`;

-- AlterTable
ALTER TABLE `application` DROP PRIMARY KEY,
    MODIFY `jobId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`jobId`, `candidateId`);

-- AlterTable
ALTER TABLE `job` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
