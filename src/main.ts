// loads the .env file into process.env
// env variables that already exist take precedence
require('dotenv').config(); 

import { NestFactory } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {

  const { app_host, app_port } = process.env;

  console.group('bootstrap');
  console.log(process.env);
  console.groupEnd();

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(null));
  await app.listen(+app_port, app_host);
}
bootstrap();
