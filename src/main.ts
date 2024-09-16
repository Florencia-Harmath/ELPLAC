/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: "*",
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
    
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
