import { IsArray, IsDate, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreatePodcastDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString()
    @IsNotEmpty()
    readonly creator: string[];

    @IsDateString()
    @IsNotEmpty()
    readonly releaseDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly fullPodcastDuration: Date;
}