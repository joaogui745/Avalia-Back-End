import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, } from "class-validator" // retirados os imports não utilizados!
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
}