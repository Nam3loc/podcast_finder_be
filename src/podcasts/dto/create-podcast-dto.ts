import { IsArray, IsDateString, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsMilitaryTimeWithSeconds } from "./CustomValidators/IsMilitaryTimeWithSeconds";

export class CreatePodcastDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly creator: string[];

    @IsDateString()
    @IsNotEmpty()
    readonly releaseDate: Date;

    @IsString()
    @Validate(IsMilitaryTimeWithSeconds)
    @IsNotEmpty()
    readonly fullPodcastDuration: Date;
}