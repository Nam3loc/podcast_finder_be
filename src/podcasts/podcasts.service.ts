import { Injectable } from '@nestjs/common';

@Injectable()
export class PodcastsService {
    //create local db by using an array
    private readonly podcasts = [];

    create(podcast) {
        this.podcasts.push(podcast);
        return this.podcasts;
    }

    findAll() {
        return this.podcasts;
    }
}
