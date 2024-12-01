import { IsNotEmpty, IsNumber, IsString , isString } from "class-validator";

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsNumber()
    userID: number;
  
    @IsNotEmpty()
    @IsNumber()
    professorID: number;
  
    @IsNotEmpty()
    @IsNumber()
    subjectID: number;
  
    @IsNotEmpty()
    @IsString()
    content: string;
}
