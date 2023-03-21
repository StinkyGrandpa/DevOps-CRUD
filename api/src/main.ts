import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.enableCors({ origin: ['*', 'http://localhost:4200'] })
  app.useGlobalPipes(new ValidationPipe({
    //disableErrorMessages: true,
    transform: true,
  }));
}
bootstrap();
