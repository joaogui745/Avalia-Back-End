import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/createEvaluation.dto';
import { UpdateEvaluationDto } from './dto/updateEvaluation.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body(ValidationPipe) EvaluationData: CreateEvaluationDto, @CurrentUser() currentUser: UserPayload) {
    if (EvaluationData.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível criar avaliações para própria conta.")
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
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) evaluationData: UpdateEvaluationDto,@CurrentUser() currentUser: UserPayload) {
    if (evaluationData.userID !== currentUser.sub){
      throw new UnauthorizedException("Só é possível editar avaliações da própria conta.")
    }
    return this.evaluationService.update(id, evaluationData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserPayload) {
    const evaluation= await this.evaluationService.findOne(id);
    if (evaluation.userID !== currentUser.sub){
      throw new UnauthorizedException("Só é possível editar avaliações da própria conta.")
    }
    return this.evaluationService.remove(id);
  }
}
