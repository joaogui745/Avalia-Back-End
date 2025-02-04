import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './createSubject.dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
