import { IsNotEmpty, IsString } from "class-validator";
import { CreateProfessorDto } from "src/professor/dto/createProfessor.dto";
import { CreateSubjectDto } from "src/subject/dto/createSubject.dto";

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsString()
    content : string
    user : {
        connect :  {id : number}
    }
    professor : {
        connectOrCreate : {
            where : {id : number},
            create : CreateProfessorDto
        }
    }
    subject : {
        connectOrCreate : {
            where : {id : number},
            create : CreateSubjectDto
        }
    }
}
