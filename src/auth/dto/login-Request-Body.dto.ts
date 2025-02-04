import { IsNotEmpty, IsString, } from "class-validator"

export class LoginRequestBody {
    @IsNotEmpty()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString()
    passWord : string;
}
