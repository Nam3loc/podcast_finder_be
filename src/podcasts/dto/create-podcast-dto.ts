import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { IsMilitaryTimeWithSeconds } from "./CustomValidators/IsMilitaryTimeWithSeconds";

export class CreatePodcastDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly creators: string[];

    @IsDateString()
    @IsNotEmpty()
    readonly releaseDate: Date;

    @IsString()
    @Validate(IsMilitaryTimeWithSeconds)
    @IsNotEmpty()
    readonly fullPodcastDuration: Date;

    @IsArray()
    @IsNumber({}, { each: true })
    readonly playlist?: number[];
}