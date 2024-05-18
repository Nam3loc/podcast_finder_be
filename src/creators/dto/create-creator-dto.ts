import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Podcast } from "src/podcasts/podcast.entity";

export class CreateCreatorDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly podcasts?: Podcast[];
}