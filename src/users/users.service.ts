import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Playlist } from "src/playlists/playlist.entity";
import { CreateUserDTO } from "./dto/create-user-dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>
    ) { }

    async createUser(userDto: CreateUserDTO) {
        const user = new User();
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.email = userDto.email;
        user.password = userDto.password;

        const playlist = await this.playlistRepo.findByIds(userDto.playlists);
        user.playlists = playlist;

        return this.userRepo.save(user);
    }
}