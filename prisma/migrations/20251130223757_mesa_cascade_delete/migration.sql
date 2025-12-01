-- DropForeignKey
ALTER TABLE `comanda` DROP FOREIGN KEY `Comanda_mesaId_fkey`;

-- AddForeignKey
ALTER TABLE `Comanda` ADD CONSTRAINT `Comanda_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
