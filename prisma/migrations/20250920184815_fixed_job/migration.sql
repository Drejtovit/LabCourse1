/*
  Warnings:

  - You are about to drop the column `city` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `job` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `job` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `job` DROP COLUMN `city`,
    DROP COLUMN `companyEmail`,
    DROP COLUMN `startDate`,
    DROP COLUMN `state`,
    DROP COLUMN `zip`,
    MODIFY `type` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT') NOT NULL,
    MODIFY `description` TEXT NOT NULL;
