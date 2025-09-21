-- DropForeignKey
ALTER TABLE `skillsonresumes` DROP FOREIGN KEY `SkillsOnResumes_resumeId_fkey`;

-- DropForeignKey
ALTER TABLE `skillsonresumes` DROP FOREIGN KEY `SkillsOnResumes_skillId_fkey`;

-- DropIndex
DROP INDEX `SkillsOnResumes_skillId_fkey` ON `skillsonresumes`;

-- AddForeignKey
ALTER TABLE `SkillsOnResumes` ADD CONSTRAINT `SkillsOnResumes_resumeId_fkey` FOREIGN KEY (`resumeId`) REFERENCES `Resume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillsOnResumes` ADD CONSTRAINT `SkillsOnResumes_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
