import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/createEvaluation.dto';
import { UpdateEvaluationDto } from './dto/updateEvaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body(ValidationPipe) EvaluationData: CreateEvaluationDto) {
    return this.evaluationService.create(EvaluationData);
  }

  @Get()
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.evaluationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) evaluationData: UpdateEvaluationDto) {
    return this.evaluationService.update(id, evaluationData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.evaluationService.remove(id);
  }
}
