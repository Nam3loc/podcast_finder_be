import { Playlist } from 'src/playlists/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // One user can create many playlists
    @OneToMany(() => Playlist, (playlist) => playlist.user, {
        cascade: true
    })
    playlists: Playlist[];
}