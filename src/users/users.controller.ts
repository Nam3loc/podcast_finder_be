import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user-dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    createUser(
        @Body()
        userDto: CreateUserDTO
    ) {
        try {
            return this.usersService.createUser(userDto);
        } catch (e) {
            throw new HttpException(
                'CreateUser method failed to create a user',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}