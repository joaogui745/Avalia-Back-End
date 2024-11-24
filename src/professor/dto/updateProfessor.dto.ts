import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './createProfessor.dto';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {}
