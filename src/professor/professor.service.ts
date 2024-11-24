import { Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/createProfessor.dto';
import { UpdateProfessorDto } from './dto/updateProfessor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessorService {
  constructor(private readonly prisma : PrismaService){}
  async create(professorData: CreateProfessorDto) {
    return await this.prisma.professor.create({data : professorData});
  }

  async findAll() {
    return await this.prisma.professor.findMany();
  }

  async findOne(professorID: number) {
    return await this.prisma.professor.findUnique({where : {id : professorID}});
  }

  async update(professorID: number, professorData: UpdateProfessorDto) {
    return await this.prisma.professor.update({where : {id : professorID}, data : professorData});
  }

  async remove(professorID: number) {
    return await this.prisma.professor.delete({where : {id : professorID}});
  }
}
