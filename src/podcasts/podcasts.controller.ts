import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { CreatePodcastDTO } from './dto/create-podcast-dto';

@Controller('podcasts')
export class PodcastsController {
    constructor(private podcastsService: PodcastsService) { }

    @Get()
    findAll() {
        return this.podcastsService.findAll();
    }

    @Get(':id')
    findOne(id) {
        return `fetch podcast based on ${id}`;
    }

    @Put(':id')
    update(id) {
        return `update podcast based on ${id}`;
    }

    @Post()
    create(@Body() createPodcastDTO: CreatePodcastDTO) {
        return this.podcastsService.create(createPodcastDTO);
    }

    @Delete(':id')
    delete(id) {
        return `delete podcast based on ${id}`;
    }
}