import { Controller, Get, Post, UsePipes, ValidationPipe, Body, ForbiddenException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@app/services';
import { User } from '@app/models';
import { userInfo } from 'os';

type LoginUser = Omit<User, 'password' | 'hashPassword'> & { accessToken: string};

const defaultPipeOptions = { whitelist: true };
const mockUser = {
  email: 'hello@world.com',
  firstName: 'John',
  lastName: 'Doe',
  username: 'john.doe',
  isActive: true,
  permissions: 'readonly',
  phone: '+1 234 567 8950',
  department: {
    id: 0,
    isActive: true,
    name: 'Accountants',
  }
};

@Controller('v1/users')
export class UsersController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  @Post('auth')
  @UsePipes(new ValidationPipe({...defaultPipeOptions, groups: ["auth"]  }))
  async auth(@Body() clientAuth: User): Promise<LoginUser> {
    if (clientAuth.username === 'john.doe' && clientAuth.password === 'pass') {
      return {
        ...mockUser,
        accessToken: this.jwtService.sign({ user_id: 1 }) 
      };
    } else {
      throw new ForbiddenException();
    }    
  }
}
