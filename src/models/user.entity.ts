import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsDefined, IsEmail, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
const bcrypt = require('bcrypt');

import { Department } from './department.entity';

/**
 * @description User model class representing the database entity in Typeorm,
 * the validation object for client requests and the transformation object
 * for responses. 
 * 
 * Thus, thus class is given to TypeORM when initializing the app.
 * Then given to class-validator validate() through ValidationPipe used
 * in controllers. And then to class-transformer classToPlain transforming 
 * the responses, as setup in main.ts.
 * 
 * Notice how we expose all props except the password.
 */
@Entity()
export class User {
  @Expose()
  @IsDefined({ groups: ['update', 'delete'] })
  @PrimaryGeneratedColumn()
  id?: number; // sequential IDs are not secure, should use UUID

  @Expose()
  @IsDefined({ groups: ['auth', 'create'] }) 
  @ValidateIf((obj: User, val: string) => !obj.email, { groups: ['auth'] })
  @Column({ unique: true })
  username: string;

  @IsDefined({ groups: ['auth', 'create'] })
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(
      this.password, 
      process.env.app_bcrypt_salt_rounds || 10
    );
  }

  @Expose()
  @IsDefined({ groups: ['create'] })
  @Column({ default: '' })
  firstName: string;

  @Expose()
  @IsDefined({ groups: ['create'] })
  @Column({ default: '' })
  lastName: string;
  
  
  @Expose()
  // for when authenticating
  // only validate e-mail property if they didn't send their username
  // as we allow login by both username and email
  // when the callback returns true the @IsDefined and @IsEmail will apply
  @ValidateIf((obj: User, val: string) => !obj.username || !obj.email, { groups: ['auth'] })
  @IsDefined({ groups: ['create', 'auth'] })
  @IsEmail()
  @Column({ unique: true, default: '' })
  email: string;

  @Expose()
  @IsDefined({ groups: ['create'] })
  @Column({ default: '' })
  phone: string;

  @Expose()
  @Column({ default: true })
  isActive: boolean;

  @Expose()
  @IsDefined({ groups: ['create'] })
  @Column({ default: 'readonly' })
  permissions: string;

  @Expose()
  @ManyToOne(type => Department, dept => dept.users)
  department?: Department;
}