import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('REST-Documentation')
    .setDescription('Nutzerdatenabnk für das Modul DevOps')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  SwaggerModule.setup('/docs', app, document);


  app.useGlobalPipes(
    new ValidationPipe({
      //disableErrorMessages: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
