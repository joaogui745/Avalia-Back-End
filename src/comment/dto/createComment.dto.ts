import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content : string
    user : {
        connect :  {
            id : number;
        }
    }
    evaluation : {
        connect : {
            id :number
        }
    }
}
