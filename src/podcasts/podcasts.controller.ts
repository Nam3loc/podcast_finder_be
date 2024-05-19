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
            return this.podcastsService.findOne(id);
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
    async update(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
        @Body() createPodcastDTO: CreatePodcastDTO
    ) {
        try {
            return await this.podcastsService.update(id, createPodcastDTO);
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
    async create(@Body() createPodcastDTO: CreatePodcastDTO) {
        try {
            return await this.podcastsService.create(createPodcastDTO);
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
    async delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    ) {
        try {
            await this.podcastsService.delete(id);
            return { message: 'Podcast deleted successfully' };
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

    // Test controllers
    @Get('insert')
    async insertDummyData() {
        await this.podcastsService.testDummyData();
        return 'Dummy data inserted';
    }

    @Get('verify')
    async verifyDummyData() {
        await this.podcastsService.verifyDummyData();
        return 'Dummy data verified';
    }
}