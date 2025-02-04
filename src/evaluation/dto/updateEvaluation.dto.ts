import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationDto } from './createEvaluation.dto';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}
