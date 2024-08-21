import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.useGlobalPipes(
    new ValidationPipe()
  );

  // Extra debugging
  // app.use((req, res, next) => {
  //   console.log('Request Received:', req.method, req.url, req.body);
  //   next();
  // });

  await app.listen(3000);
}
bootstrap();
