import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Podcast } from "src/podcasts/podcast.entity";
import { User } from "src/users/user.entity";
import { PlaylistsController } from "./playlists.controller";
import { PlaylistsService } from "./playlists.service";


@Module({
    imports: [TypeOrmModule.forFeature([Playlist, Podcast, User])],
    controllers: [PlaylistsController],
    providers: [PlaylistsService]
})

export class PlaylistModule { }