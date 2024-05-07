-- CreateTable
CREATE TABLE `Note` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `content` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
