import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreatePlaylistDTO } from "./dto/create-playlist-dto";
import { PlaylistsService } from "./playlists.service";

@Controller('playlists')
export class PlaylistsController {
    constructor(private playlistService: PlaylistsService) { }

    @Get()
    findAll() {
        try {
            return this.playlistService.findAllPlaylists();
        } catch (e) {
            throw new HttpException(
                'FindAll method failed to get the playlists',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: number
    ) {
        try {
            return this.playlistService.findOnePlaylist(id);
        } catch (e) {
            throw new HttpException(
                'FindOne method failed to get a playlist',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
        @Body() createPlaylistDTO: CreatePlaylistDTO
    ) {
        try {
            return await this.playlistService.updatePlaylist(id, createPlaylistDTO);
        } catch (e) {
            throw new HttpException(
                'Update method failed to update a playlist',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Post()
    async create(@Body() createPlaylistDTO: CreatePlaylistDTO) {
        try {
            return await this.playlistService.createPlaylist(createPlaylistDTO);
        } catch (e) {
            throw new HttpException(
                'Create method failed to create the playlist',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    ) {
        try {
            await this.playlistService.deletePlaylist(id);
            return { message: 'Playlist deleted successfully' };
        } catch (e) {
            throw new HttpException(
                'Delete method failed to delete the playlist',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}