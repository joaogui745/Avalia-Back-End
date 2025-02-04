import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/createProfessor.dto';
import { UpdateProfessorDto } from './dto/updateProfessor.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Public()
  @Post()
  create(@Body(ValidationPipe) professorData: CreateProfessorDto) {
    return this.professorService.create(professorData);
  }

  @Public()
  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.professorService.findOne(id);
  }
  
  @Public()
  @Get('subjects/:professorId')
  async getSubjectsByProfessor(@Param('professorId', ParseIntPipe) professorId: number) {
    if (!professorId) {
      throw new Error('Professor ID is required');
    }

    return this.professorService.getSubjectsForProfessor(Number(professorId));
  }


  
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(+id, updateProfessorDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.professorService.remove(id);
  }
  
  @Public()
  @Get('evaluations/:professorId')
  async getEvaluationsByProfessor(@Param('professorId', ParseIntPipe) professorId: number) {

    if (!professorId) {
      throw new Error('Professor ID is required');
    }

    return this.professorService.getEvaluationsForProfessor(Number(professorId));
  }

}