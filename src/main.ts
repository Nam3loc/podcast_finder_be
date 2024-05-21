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
// I fixed the issue where the DB didnt have the podcast_creators joinTable
// Added all the methods in the services and controllers for all of my functionality
// Deleted all existing data in the DB and recreated users and creators
// When I tried to recreate a podcast, even with just one creator, it failed
// I am trying to debug that and figure it out
// My guess is that there is something wrong with the new podcast_creators joinTable that was inserted
// All of my logging for the create method in the code works which makes me think it is another DB issue
// I am trying to create test methods to insert dummy data but am now having issues with that
// Working on trying to get the dummy data figured out, then moving forward to fixing the create
// Then once I can create a podcast with only one creator, I want to make it to where I can
// create a podcast with multiple creators.
// I am now writing service unit tests