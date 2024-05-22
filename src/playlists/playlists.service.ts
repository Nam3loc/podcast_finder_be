import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Playlist } from "./playlist.entity";
import { Podcast } from "src/podcasts/podcast.entity";
import { User } from "src/users/user.entity";
import { CreatePlaylistDTO } from "./dto/create-playlist-dto";

@Injectable()
export class PlaylistsService {
    private readonly logger = new Logger(PlaylistsService.name);

    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,

        @InjectRepository(Podcast)
        private podcastRepo: Repository<Podcast>,

        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    findAllPlaylists(): Promise<Playlist[]> {
        return this.playlistRepo.find();
    }

    findOnePlaylist(id: number): Promise<Playlist> {
        return this.playlistRepo.findOne({ where: { id } });
    }

    private async handlePodcasts(podcasts?: number[]): Promise<Podcast[]> {
        if (podcasts && podcasts.length > 0) {
            return await this.podcastRepo.findByIds(podcasts);
        }
        return [];
    }

    private async handleUsers(id: number): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new BadRequestException(`Cannot find user with id: ${id}`);
        }
        return user;
    }

    private async preparePlaylist(playlist: Playlist, playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
        playlist.name = playlistDTO.name;
        playlist.podcasts = await this.handlePodcasts(playlistDTO.podcast);
        playlist.user = await this.handleUsers(playlistDTO.user);
        return playlist;
    }

    async createPlaylist(playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
        const playlist = new Playlist();
        await this.preparePlaylist(playlist, playlistDTO);
        return this.playlistRepo.save(playlist);
    }

    async updatePlaylist(id: number, playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
        const playlist = await this.playlistRepo.findOne({ where: { id } });
        if (!playlist) {
            throw new NotFoundException(`Cannot find a playlist to update with with id: ${id}`);
        }
        await this.preparePlaylist(playlist, playlistDTO);
        return this.playlistRepo.save(playlist);
    }

    async deletePlaylist(id: number): Promise<void> {
        const playlist = await this.playlistRepo.findOne({ where: { id } });
        if (!playlist) {
            throw new NotFoundException(`Cannot find a playlist to delete with with id: ${id}`);
        }

        try {
            await this.playlistRepo.remove(playlist);
        } catch (e) {
            throw new BadRequestException(`Failed to delete the playlist: ${e.message}`);
        }
    }
}