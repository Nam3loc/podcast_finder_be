import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastsModule } from './podcasts/podcasts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PodcastsModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
