import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

import { User } from '@app/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneBy(parameters: Partial<User>): Promise<User> {
    return this.usersRepository.findOne(parameters);
  }

  findManyBy(parameters: Partial<User>): Promise<User[]> {
    return this.usersRepository.find({ where: parameters });
  }

  async findOneByAuth(clientAuth: Pick<User, 'email' | 'username' | 'password'>): Promise<User> {
    const [dbUser] = await this.usersRepository.find({ 
      where: [ 
        { username: clientAuth.username },
        { email: clientAuth.email },
      ],
      take: 1
    });

 
    return dbUser && await bcrypt.compare(clientAuth.password, dbUser.password)
      ? dbUser
      : null;    
  }

  create(user: Omit<User, 'id'>) {
    return this.usersRepository.create(user);
  }

  deleteOneByUsername(user: Pick<User, 'username'>) {
    return this.usersRepository.delete(user);
  }
}
