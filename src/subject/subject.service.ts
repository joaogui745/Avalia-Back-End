import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/createSubject.dto';
import { UpdateSubjectDto } from './dto/updateSubject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma : PrismaService){}
  async create(subjectData: CreateSubjectDto) {
    return await this.prisma.subject.create({data : subjectData});
  }

  async findAll() {
    return await this.prisma.subject.findMany();
  }

  async findOne(subjectID: number) {
    return await this.prisma.subject.findUnique({where : {id : subjectID}});
  }

  async update(subjectID: number, subjectData: UpdateSubjectDto) {
    return await this.prisma.subject.update({where : {id : subjectID}, data : subjectData});
  }

  async remove(subjectID: number) {
    return await this.prisma.subject.delete({where : {id : subjectID}});
  }
}
