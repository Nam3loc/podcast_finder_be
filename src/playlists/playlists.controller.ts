import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
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
        try {
            return this.playlistService.create(playlistDTO);
        } catch (e) {
            throw new HttpException(
                'Create method failed to create the playlists',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}