import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Creator } from "./creator.entity";
import { Podcast } from "src/podcasts/podcast.entity";
import { CreatorsController } from "./creators.controller";
import { CreatorsService } from "./creators.service";

@Module({
    imports: [TypeOrmModule.forFeature([Creator, Podcast])],
    controllers: [CreatorsController],
    providers: [CreatorsService]
})

export class CreatorModule { }