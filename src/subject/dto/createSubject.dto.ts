import { IsNotEmpty, IsString } from "class-validator";
import { CreateProfessorDto } from "src/professor/dto/createProfessor.dto";

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    name : string
}
