import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "src/playlists/playlist.entity";
import { User } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Playlist])],
    controllers: [UsersController],
    providers: [UsersService]
})

export class UserModule { }