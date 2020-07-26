import { MigrationInterface, QueryRunner } from "typeorm";
const bcrypt = require('bcrypt');

export class SeedAdminUser1595802314826 implements MigrationInterface {
  adminUser = {
    username: 'admin',
    password: 'admin',
    permissions: 'update',
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await bcrypt.hash(this.adminUser.password, 10);

    await queryRunner.query(
      'INSERT INTO user (username, password, permissions) VALUES (?, ?, ?)',
      [this.adminUser.username, hashPassword, this.adminUser.permissions]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM users WHERE username = ?',
      [this.adminUser.username]
    );
  }

}
