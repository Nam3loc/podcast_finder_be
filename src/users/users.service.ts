import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

    findAllUsers(): Promise<User[]> {
        return this.userRepo.find();
    }

    findOneUserById(id: number): Promise<User> {
        return this.userRepo.findOne({ where: { id } });
    }

    private async handlePlaylists(playlists?: number[]): Promise<Playlist[]> {
        if (playlists && playlists.length > 0) {
            return await this.playlistRepo.findByIds(playlists);
        }
        return [];
    }

    private async prepareUser(user: User, userDTO: CreateUserDTO): Promise<User> {
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.email = userDTO.email;
        user.password = userDTO.password
        user.playlists = await this.handlePlaylists(userDTO.playlists);
        return user;
    }

    async createUser(userDto: CreateUserDTO) {
        const user = new User();
        await this.prepareUser(user, userDto);

        return this.userRepo.save(user);
    }

    async updateUser(id: number, userDTO: CreateUserDTO): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Cannot find a user to update with that unique id.');
        }
        await this.prepareUser(user, userDTO);

        return this.userRepo.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Cannot find a user to delete with that unique id.');
        }

        try {
            await this.userRepo.remove(user);
        } catch (e) {
            throw new BadRequestException(`Failed to delete the user: ${e.message}`);
        }
    }
}