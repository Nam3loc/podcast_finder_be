import { Podcast } from 'src/podcasts/podcast.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('playlists')
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Each playlist will have multiple podcasts
    @OneToMany(() => Podcast, (podcast) => podcast.playlist)
    podcasts: Podcast[];

    // Many playlists can belong to a single unique user
    @ManyToOne(() => User, (user) => user.playlists)
    user: User;
}
