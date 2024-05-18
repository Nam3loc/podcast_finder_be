import { Injectable } from "@nestjs/common";
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

    findAll() {
        return this.creatorsRepo;
    }

    findOne() {

    }

    async create(creatorsDTO: CreateCreatorDTO) {
        const creator = new Creator();
        creator.name = creatorsDTO.name;

        if (creatorsDTO.podcasts && creatorsDTO.podcasts.length > 0) {
            const podcasts = await this.podcastsRepo.findByIds(creatorsDTO.podcasts);
            creator.podcasts = podcasts;
        }

        return this.creatorsRepo.save(creator);
    }

    update() {

    }

    delete() {

    }
}