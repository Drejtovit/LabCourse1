-- DropForeignKey
ALTER TABLE `phonenumber` DROP FOREIGN KEY `PhoneNumber_userId_fkey`;

-- DropIndex
DROP INDEX `PhoneNumber_userId_fkey` ON `phonenumber`;

-- AlterTable
ALTER TABLE `candidate` MODIFY `zip` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `location` MODIFY `zip` VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE `PhoneNumber` ADD CONSTRAINT `PhoneNumber_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
