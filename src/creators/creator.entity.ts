import { Podcast } from 'src/podcasts/podcast.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('creators')
export class Creator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Many creators can create many podcasts
    @ManyToMany(() => Podcast, (podcast) => podcast.creators)
    @JoinTable({ name: 'podcasts_creators' })
    podcasts: Podcast[]
}