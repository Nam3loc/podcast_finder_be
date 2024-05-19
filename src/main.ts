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
// Successfully got all the endpoints working. The create podcast endpoint doesnt work
// when you try to create a podcast with multiple creators. So I looked into the DB and why it
// wasnt letting me do that. I ended up doing a lot with chatGPT and nothing worked
// So I tried to implement a new form on the joinTable in the creator and podcast entity
// but it did not look like it was working. I dropped the table and am now getting an error
// about a foreign key still existing even though I dropped the table and every time I
// try to query the fk, it never comes up. I am hoping if I give it time, that the key is
// just cached and when I come back everything will work. If not, I need to figure out how to
// get rid of all instances of the fk and recreate the porcasts_creators table using my code