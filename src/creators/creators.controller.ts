import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreatorsService } from "./creators.service";
import { CreateCreatorDTO } from "./dto/create-creator-dto";

@Controller('creators')
export class CreatorsController {
    constructor(private creatorsService: CreatorsService) { }

    @Get()
    findAll() {
        try {
            return this.creatorsService.findAll()
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
        @Param(':id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number
    ) {
        try {
            return `fetch creators based on ${id}`;
        } catch (e) {
            throw new HttpException(
                'FindOne method failed to get a podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Put(':id')
    update(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number
    ) {
        try {
            return `update creators based on ${id}`;
        } catch (e) {
            throw new HttpException(
                'Update method failed to update a podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Post()
    create(@Body() createCreatorsDTO: CreateCreatorDTO) {
        try {
            return this.creatorsService.create(createCreatorsDTO);
        } catch (e) {
            throw new HttpException(
                'Create method failed to create the podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }

    @Delete(':id')
    delete(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number
    ) {
        try {
            return `delete creators based on ${id}`;
        } catch (e) {
            throw new HttpException(
                'Delete method failed to delete the podcast',
                HttpStatus.BAD_REQUEST,
                {
                    cause: e
                }
            )
        }
    }
}