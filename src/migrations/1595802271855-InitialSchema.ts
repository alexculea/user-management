import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1595802271855 implements MigrationInterface {
    name = 'InitialSchema1595802271855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL DEFAULT '', `lastName` varchar(255) NOT NULL DEFAULT '', `email` varchar(255) NOT NULL DEFAULT '', `phone` varchar(255) NOT NULL DEFAULT '', `isActive` tinyint NOT NULL DEFAULT 1, `permissions` varchar(255) NOT NULL DEFAULT 'readonly', `departmentId` int NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `department` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_471da4b90e96c1ebe0af221e07` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_3d6915a33798152a079997cad28` FOREIGN KEY (`departmentId`) REFERENCES `department`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_3d6915a33798152a079997cad28`");
        await queryRunner.query("DROP INDEX `IDX_471da4b90e96c1ebe0af221e07` ON `department`");
        await queryRunner.query("DROP TABLE `department`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
