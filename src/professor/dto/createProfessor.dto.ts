import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfessorDto {
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsString()
    department : string;
    // TODO: IMPLEMENTAR VERIFICAÇÃO DE RELAÇÕES
}
