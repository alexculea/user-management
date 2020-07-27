import { Controller, Get, Post, UsePipes, ValidationPipe, Body, ForbiddenException, UseGuards, Put, Delete} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@app/services';
import { User } from '@app/models';
import { AuthGuard, PermissionGuard } from '@app/guards';

type LoginUser = Omit<User, 'password' | 'hashPassword'> & { accessToken: string};
const defaultPipeOptions = { whitelist: true };

@Controller('v1/users')
export class UsersController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  @Post('auth')
  @UsePipes(new ValidationPipe({...defaultPipeOptions, groups: ["auth"]  }))
  async auth(@Body() clientAuth: User): Promise<LoginUser> {
    const user = await this.userService.findOneByAuth(clientAuth)
    if (user) {
      return {
        ...user,
        accessToken: this.jwtService.sign({ user_id: 1 }) 
      };
    } else {
      throw new ForbiddenException();
    }    
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(new PermissionGuard("readOnly"))
  @UsePipes(new ValidationPipe({...defaultPipeOptions, groups: ["auth"]  }))
  async getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(new PermissionGuard("update"))
  @UsePipes(new ValidationPipe({...defaultPipeOptions, groups: ["create"]  }))
  async create(@Body() newUser: User): Promise<User> {
    return this.userService.create(newUser)
  }


  @Put()
  @UseGuards(AuthGuard)
  @UseGuards(new PermissionGuard("update"))
  @UsePipes(new ValidationPipe({...defaultPipeOptions, groups: ["create"]  }))
  async update(@Body() updatedUser: User): Promise<User> {
    return this.userService.create(updatedUser)
  }

  @Delete()
  @UseGuards(AuthGuard)
  @UseGuards(new PermissionGuard("update"))
  @UsePipes(new ValidationPipe({...defaultPipeOptions, groups: ["create"]  }))
  async delete(@Body() user: Pick<User, 'id'>) {
    return this.userService.deleteOneById(user);
  }
}
