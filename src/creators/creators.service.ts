import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCreatorDTO } from "./dto/create-creator-dto";
import { Creator } from "./creator.entity";
import { Podcast } from "src/podcasts/podcast.entity";

@Injectable()
export class CreatorsService {
    constructor(
        @InjectRepository(Creator)
        private creatorsRepo: Repository<Creator>,

        @InjectRepository(Podcast)
        private podcastsRepo: Repository<Podcast>
    ) { }

    findAllCreators(): Promise<Creator[]> {
        return this.creatorsRepo.find();
    }

    findOneCreatorById(id: number): Promise<Creator> {
        return this.creatorsRepo.findOne({ where: { id } });
    }

    private async handlePodcasts(podcasts?: Podcast[]): Promise<Podcast[]> {
        if (podcasts && podcasts.length > 0) {
            return await this.podcastsRepo.findByIds(podcasts);
        }
        return [];
    }

    private async prepareCreator(creator: Creator, creatorDTO: CreateCreatorDTO): Promise<Creator> {
        creator.name = creatorDTO.name;
        creator.podcasts = await this.handlePodcasts(creatorDTO.podcasts);
        return creator;
    }

    async createCreator(creatorDTO: CreateCreatorDTO): Promise<Creator> {
        const creator = new Creator();
        await this.prepareCreator(creator, creatorDTO);
        return this.creatorsRepo.save(creator);
    }

    async updateCreator(id: number, creatorDTO: CreateCreatorDTO): Promise<Creator> {
        const creator = await this.creatorsRepo.findOne({ where: { id } });
        if (!creator) {
            throw new NotFoundException('Cannot find a creator to update with that unique id.');
        }
        await this.prepareCreator(creator, creatorDTO);
        return this.creatorsRepo.save(creator);
    }

    async deleteCreator(id: number): Promise<void> {
        const creator = await this.creatorsRepo.findOne({ where: { id } });
        if (!creator) {
            throw new NotFoundException('Cannot find a creator to delete with that unique id.');
        }

        try {
            await this.creatorsRepo.remove(creator);
        } catch (e) {
            throw new BadRequestException(`Failed to delete the creator: ${e.message}`);
        }
    }
}