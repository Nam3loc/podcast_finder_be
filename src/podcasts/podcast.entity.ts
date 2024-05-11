import { Creator } from 'src/creators/creator.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity('podcasts')
export class Podcast {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('varchar', { array: true })
    creator: string[];

    @Column('date')
    releaseDate: Date;

    @Column('time')
    fullPodcastDuration: Date;

    // Many creators can create many podcasts
    @ManyToMany(() => Creator, (creator) => creator.podcasts)
    @JoinTable({ name: 'podcasts_creators' })
    creators: Creator[]

    // Many podcasts can belong to one playlist for each unique user
    @ManyToOne(() => Playlist, (playlist) => playlist.podcasts)
    playlist: Playlist;
}