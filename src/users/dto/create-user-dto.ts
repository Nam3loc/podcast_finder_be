import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    readonly password: string;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    readonly playlists: number[];
}