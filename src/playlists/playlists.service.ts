import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Playlist } from "./playlist.entity";
import { Podcast } from "src/podcasts/podcast.entity";
import { User } from "src/users/user.entity";
import { CreatePlaylistDTO } from "./dto/create-playlist-dto";

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,

        @InjectRepository(Podcast)
        private podcastRepo: Repository<Podcast>,

        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async create(playlistDto: CreatePlaylistDTO): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = playlistDto.name;

        const podcast = await this.podcastRepo.findByIds(playlistDto.podcast);
        playlist.podcasts = podcast;

        const user = await this.userRepo.findOneBy({ id: playlistDto.user });
        playlist.user = user;

        return this.playlistRepo.save(playlist);
    }
}