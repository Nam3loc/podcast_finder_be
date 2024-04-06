import { Controller, Get } from '@nestjs/common';

@Controller('podcasts')
export class PodcastsController {

    @Get()
    findAll() {
        return 'find all podcasts';
    }
}
