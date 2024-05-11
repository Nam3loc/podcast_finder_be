import { Body, Controller, Post } from "@nestjs/common";
import { CreatePlaylistDTO } from "./dto/create-playlist-dto";
import { Playlist } from "./playlist.entity";
import { PlaylistsService } from "./playlists.service";

@Controller('playlists')
export class PlaylistsController {
    constructor(private playlistService: PlaylistsService) { }

    @Post()
    create(
        @Body()
        playlistDTO: CreatePlaylistDTO
    ): Promise<Playlist> {
        return this.playlistService.create(playlistDTO);
    }
}