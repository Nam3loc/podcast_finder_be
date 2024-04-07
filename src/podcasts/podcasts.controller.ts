import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('podcasts')
export class PodcastsController {
    @Get()
    findAll() {
        return 'find all podcasts';
    }

    @Get(':id')
    findOne() {
        return 'fetch podcast based on id';
    }
    s
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