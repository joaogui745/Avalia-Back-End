import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/createSubject.dto';
import { UpdateSubjectDto } from './dto/updateSubject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma : PrismaService){}
  async create(subjectData: CreateSubjectDto) {

    return await this.prisma.subject.create({
      data: subjectData

    });
  }

  async findAll() {
    return await this.prisma.subject.findMany({
      include: {
        professor: true
      }
    })
  }

  async findOne(subjectID: number) {
    const subject = await this.prisma.subject.findUnique({
      where: {id: subjectID},
      include:{
        professor: true,
      }
    })
    if (!subject){
      throw new NotFoundException(`Disciplina com ID ${subjectID} não encontrada`)
    }
    return subject;
  }

  async update(subjectID: number, subjectData: UpdateSubjectDto) {
    const existesubject = await this.prisma.subject.findUnique({
      where:{

        id: subjectID
      }
    });
    if (!existesubject){
      throw new NotFoundException(`Disciplina com ID ${subjectID} não encontrada`)

    }
    return await this.prisma.subject.update({
      where:{ id: subjectID},
      data: {
        name: subjectData.name,
      }
    ,});
  }

  async remove(subjectID: number) {
    return await this.prisma.subject.delete({
      where: {id: subjectID },
    }).catch((error) => {
      if(error.code === 'P2025'){ throw new NotFoundException
        (`Disciplina com ID ${subjectID} não encontrada`) // rotas testadas

      }
      throw error;
    });
  }
}
