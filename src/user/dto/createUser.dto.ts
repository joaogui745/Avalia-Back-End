import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty() // Talvez Colocar um Min lenght
    @IsString()
    passWord : string

    @IsNotEmpty()
    @IsString()
    department : string;

    @IsNotEmpty()
    @IsString()
    course : string;

    @IsOptional()
    @IsString()
    profilePic? : string;

    @IsDateString()
    createdAt : Date;

    @IsDateString()
    updatedAt : Date;
}