import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}
bootstrap();


// https://www.youtube.com/watch?v=sFnAHC9lLaw - 1:33:00 seconds into the video
// Need to finish setting up all of the podcasts methods in the podcast service and controller
// findAll90 and create() are working correctly. Need to wire up the rest