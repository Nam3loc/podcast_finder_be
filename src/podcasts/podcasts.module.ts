import { Module } from '@nestjs/common';
import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './podcast.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Creator } from 'src/creators/creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Playlist, Creator])],
  controllers: [PodcastsController],
  providers: [PodcastsService]
})

export class PodcastsModule { }
