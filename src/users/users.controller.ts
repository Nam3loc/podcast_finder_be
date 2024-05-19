import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user-dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    findAll() {
        try {
            return this.usersService.findAllUsers();
        } catch (e) {
            throw new HttpException(
                'FindAll method failed to get the users',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: number
    ) {
        try {
            return this.usersService.findOneUserById(id);
        } catch (e) {
            throw new HttpException(
                'FindOne method failed to get a user',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
        @Body() createUserDTO: CreateUserDTO
    ) {
        try {
            return await this.usersService.updateUser(id, createUserDTO);
        } catch (e) {
            throw new HttpException(
                'Update method failed to update a user',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        try {
            return await this.usersService.createUser(createUserDTO);
        } catch (e) {
            throw new HttpException(
                'Create method failed to create the user',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    ) {
        try {
            await this.usersService.deleteUser(id);
            return { message: 'User deleted successfully' };
        } catch (e) {
            throw new HttpException(
                'Delete method failed to delete the user',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}