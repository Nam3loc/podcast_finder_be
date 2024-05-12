import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { CreatePodcastDTO } from './dto/create-podcast-dto';

@Controller('podcasts')
export class PodcastsController {
    constructor(private podcastsService: PodcastsService) { }

    @Get()
    findAll() {
        try {
            return this.podcastsService.findAll();
        } catch (e) {
            throw new HttpException(
                'FindAll method failed to get the podcasts',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: number
    ) {
        try {
            return `fetch podcast based on ${id}`;
        } catch (e) {
            throw new HttpException(
                'FindOne method failed to get a podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Put(':id')
    update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: number
    ) {
        try {
            return `update podcast based on ${id}`;
        } catch (e) {
            throw new HttpException(
                'Update method failed to update a podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Post()
    create(@Body() createPodcastDTO: CreatePodcastDTO) {
        try {
            return this.podcastsService.create(createPodcastDTO);
        } catch (e) {
            throw new HttpException(
                'Create method failed to create the podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Delete(':id')
    delete(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: number
    ) {
        try {
            return `delete podcast based on ${id}`;
        } catch (e) {
            throw new HttpException(
                'Delete method failed to delete the podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}