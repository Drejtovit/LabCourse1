-- CreateTable
CREATE TABLE `Fabrika` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emriFabrikes` VARCHAR(191) NOT NULL,
    `lokacioni` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Punetori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emri` VARCHAR(191) NOT NULL,
    `mbiemri` VARCHAR(191) NOT NULL,
    `pozita` VARCHAR(191) NOT NULL,
    `fabrikaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Punetori` ADD CONSTRAINT `Punetori_fabrikaId_fkey` FOREIGN KEY (`fabrikaId`) REFERENCES `Fabrika`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
