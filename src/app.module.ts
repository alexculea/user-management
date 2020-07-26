import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from '@app/services';
import { UsersController } from '@app/controllers';

import { User, Department } from '@app/models';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.db_host,
      port: +process.env.db_port,
      username: process.env.db_user,
      password: process.env.db_pass,
      database: process.env.db_schema,
      entities: [__dirname + "dist/**/*.entity{ .ts,.js}"],
      synchronize: false,
      autoLoadEntities: true,
      retryDelay: process.env.app_stage === 'dev' ? 30 * 1000 : 5000,
    }),
    TypeOrmModule.forFeature([User, Department]),
    JwtModule.register({
      secret: 'hello-wirld',
      signOptions: { expiresIn: '300s' }
    })
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UserService],  
})
export class AppModule {}
