import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/createProfessor.dto';
import { UpdateProfessorDto } from './dto/updateProfessor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  create(@Body(ValidationPipe) professorData: CreateProfessorDto) {
    return this.professorService.create(professorData);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.professorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(+id, updateProfessorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.professorService.remove(id);
  }
}
