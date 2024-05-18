import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/playlists/playlist.entity';
import { Repository } from 'typeorm';
import { Podcast } from './podcast.entity';
import { CreatePodcastDTO } from './dto/create-podcast-dto';
import { Creator } from 'src/creators/creator.entity';

@Injectable()
export class PodcastsService {
    constructor(
        @InjectRepository(Podcast)
        private podcastRepo: Repository<Podcast>,

        @InjectRepository(Creator)
        private creatorRepo: Repository<Creator>,

        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>
    ) { }

    findAll() {
        return this.podcastRepo.find();
    }

    findOne() {

    }

    async create(podcastDTO: CreatePodcastDTO) {
        const podcast = new Podcast();
        podcast.title = podcastDTO.title;

        const podcastCreators = await Promise.all(
            podcastDTO.creators.map(async (name) => {
                const creator = await this.creatorRepo.findOne({ where: { name } });
                return creator;
            })
        )

        if (podcastCreators.some(podcastCreator => !podcastCreator)) {
            throw new Error('Cannot find one or more creators.');
        }

        podcast.creators = podcastCreators;

        podcast.releaseDate = podcastDTO.releaseDate;
        podcast.fullPodcastDuration = podcastDTO.fullPodcastDuration;

        if (podcastDTO.playlists && podcastDTO.playlists.length > 0) {
            const playlist = await this.playlistRepo.findByIds(podcastDTO.playlists);
            podcast.playlists = playlist;
        }

        return this.podcastRepo.save(podcast);
    }

    update() {

    }

    delete() {

    }
}
