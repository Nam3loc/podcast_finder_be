import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
    constructor(private podcastsService: PodcastsService) { }

    @Get()
    findAll() {
        return 'find all podcasts';
    }

    @Get(':id')
    findOne() {
        return 'fetch podcast based on id';
    }

    @Put(':id')
    update() {
        return 'update podcast based on id';
    }

    @Post()
    create() {
        return 'create new podcast';
    }

    @Delete(':id')
    delete() {
        return 'delete podcast based on id';
    }
}