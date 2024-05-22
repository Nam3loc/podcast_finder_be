import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreatorsService } from "./creators.service";
import { CreateCreatorDTO } from "./dto/create-creator-dto";

@Controller('creators')
export class CreatorsController {
    constructor(private creatorsService: CreatorsService) { }

    @Get()
    findAll() {
        try {
            return this.creatorsService.findAllCreators();
        } catch (e) {
            throw new HttpException(
                'FindAll method failed to get the creators',
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
            return this.creatorsService.findOneCreatorById(id);
        } catch (e) {
            throw new HttpException(
                'FindOne method failed to get a creator',
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
        @Body() createCreatorDTO: CreateCreatorDTO
    ) {
        try {
            return await this.creatorsService.updateCreator(id, createCreatorDTO);
        } catch (e) {
            throw new HttpException(
                'Update method failed to update a creator',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Post()
    async create(@Body() createCreatorDTO: CreateCreatorDTO) {
        try {
            return await this.creatorsService.createCreator(createCreatorDTO);
        } catch (e) {
            throw new HttpException(
                'Create method failed to create the creator',
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
            await this.creatorsService.deleteCreator(id);
            return { message: 'Creator deleted successfully' };
        } catch (e) {
            throw new HttpException(
                'Delete method failed to delete the creator',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}