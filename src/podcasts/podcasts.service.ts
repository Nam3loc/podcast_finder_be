import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/playlists/playlist.entity';
import { Repository } from 'typeorm';
import { Podcast } from './podcast.entity';
import { CreatePodcastDTO } from './dto/create-podcast-dto';
import { Creator } from 'src/creators/creator.entity';

@Injectable()
export class PodcastsService {
    private readonly logger = new Logger(PodcastsService.name);

    constructor(
        @InjectRepository(Podcast)
        private podcastRepo: Repository<Podcast>,

        @InjectRepository(Creator)
        private creatorRepo: Repository<Creator>,

        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>
    ) { }

    findAll(): Promise<Podcast[]> {
        return this.podcastRepo.find();
    }

    findOne(id: number): Promise<Podcast> {
        return this.podcastRepo.findOne({ where: { id } });
    }

    private async handleCreators(creators: string[]): Promise<Creator[]> {
        const podcastCreators = await Promise.all(
            creators.map(async (name) => {
                const creator = await this.creatorRepo.findOne({ where: { name } });
                if (!creator) {
                    this.logger.debug(`Creator not found for name: ${name}`);
                }
                return creator;
            })
        );

        if (podcastCreators.some(podcastCreator => !podcastCreator)) {
            throw new BadRequestException('Cannot find one or more creators.');
        }

        return podcastCreators;
    }


    private async handlePlaylists(playlists?: number[]): Promise<Playlist[]> {
        if (playlists && playlists.length > 0) {
            return await this.playlistRepo.findByIds(playlists);
        }
        return [];
    }

    private async preparePodcast(podcast: Podcast, podcastDTO: CreatePodcastDTO): Promise<Podcast> {
        podcast.title = podcastDTO.title;
        this.logger.debug(`title is working: ${podcast.title}`);
        podcast.creators = await this.handleCreators(podcastDTO.creators);
        this.logger.debug(`creators is working: ${JSON.stringify(podcast.creators)}`);
        podcast.releaseDate = podcastDTO.releaseDate;
        this.logger.debug(`releaseDate is working: ${podcast.releaseDate}`);
        podcast.fullPodcastDuration = podcastDTO.fullPodcastDuration;
        this.logger.debug(`fullDurationPodcast is working: ${podcast.fullPodcastDuration}`);
        podcast.playlists = await this.handlePlaylists(podcastDTO.playlists);
        this.logger.debug(`playlists is working: ${JSON.stringify(podcast.playlists)}`);
        this.logger.debug(`checking podcast: ${JSON.stringify(podcast)}`);
        return podcast;
    }

    async create(podcastDTO: CreatePodcastDTO): Promise<Podcast> {
        const podcast = new Podcast();
        await this.preparePodcast(podcast, podcastDTO);
        return this.podcastRepo.save(podcast);
    }

    async update(id: number, podcastDTO: CreatePodcastDTO): Promise<Podcast> {
        const podcast = await this.podcastRepo.findOne({ where: { id } });
        if (!podcast) {
            throw new NotFoundException('Cannot find a podcast to update with that unique id.');
        }
        await this.preparePodcast(podcast, podcastDTO);
        return this.podcastRepo.save(podcast);
    }

    async delete(id: number): Promise<void> {
        const podcast = await this.podcastRepo.findOne({ where: { id } });
        if (!podcast) {
            throw new NotFoundException('Cannot find a podcast to delete with that unique id.');
        }

        try {
            await this.podcastRepo.remove(podcast);
        } catch (e) {
            throw new BadRequestException(`Failed to delete the podcast: ${e.message}`);
        }
    }
}