import { Creator } from 'src/creators/creator.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity('podcasts')
export class Podcast {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // Many creators can create many podcasts
    @ManyToMany(() => Creator, creator => creator.podcasts)
    @JoinTable({
        name: "podcast_creators",
        joinColumn: { name: "podcastId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "creatorId", referencedColumnName: "id" }
    })
    creators: Creator[];

    // @Column('date')
    // releaseDate: Date;

    // @Column('time')
    // fullPodcastDuration: Date;

    @Column('date')
    releaseDate: string;

    @Column('time')
    fullPodcastDuration: string;

    // Many podcasts can belong to one playlist for each unique user
    @ManyToOne(() => Playlist, (playlist) => playlist.podcasts)
    playlists?: Playlist[];
}