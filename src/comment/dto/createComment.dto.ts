import { IsNotEmpty, IsString, IsNumber} from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    userID: number;

    @IsNotEmpty()
    @IsNumber()
    evaluationID: number;
}
