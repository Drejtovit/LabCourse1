-- AlterTable
ALTER TABLE `resume` ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `details` TEXT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;
