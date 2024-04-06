import { Controller, Get } from '@nestjs/common';

@Controller('podcasts')
export class PodcastsController {

    @Get()
    findAll() {
        return 'find all podcasts';
    }
}

// https://www.youtube.com/watch?v=sFnAHC9lLaw - 15:54 was last watched