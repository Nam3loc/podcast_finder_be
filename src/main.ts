import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}
bootstrap();


// https://www.youtube.com/watch?v=sFnAHC9lLaw - 1:21:00 seconds into the video