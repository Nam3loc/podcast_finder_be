import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { IsMilitaryTimeWithSeconds } from "./CustomValidators/IsMilitaryTimeWithSeconds";

export class CreatePodcastDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly creators: string[];

    // @IsDateString()
    // @IsNotEmpty()
    // readonly releaseDate: Date;

    // @IsString()
    // @Validate(IsMilitaryTimeWithSeconds)
    // @IsNotEmpty()
    // readonly fullPodcastDuration: Date;

    @IsDateString()
    @IsNotEmpty()
    readonly releaseDate: string;

    @IsString()
    @Validate(IsMilitaryTimeWithSeconds)
    @IsNotEmpty()
    readonly fullPodcastDuration: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly playlists?: number[];
}