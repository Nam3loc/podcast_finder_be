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
// Need to inject repos into podcasts service, and correctly wire up the methods in service
// Need to fix passing the service into the controller and get the endpoint for podcasts working
// Create some podcasts in the DB