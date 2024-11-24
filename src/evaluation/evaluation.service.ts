import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/createEvaluation.dto';
import { UpdateEvaluationDto } from './dto/updateEvaluation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma : PrismaService){}
  async create(EvaluationData: CreateEvaluationDto) {
    return await this.prisma.evaluation.create({data : EvaluationData});
  }

  async findAll() {
    return await this.prisma.evaluation.findMany();
  }

  async findOne(evaluationID: number) {
    return await this.prisma.evaluation.findUnique({where: {id : evaluationID}});
  }

  async update(evaluationID: number, evaluationData: UpdateEvaluationDto) {
    return await this.prisma.evaluation.update({where : {id : evaluationID}, data : evaluationData});
  }

  async remove(evaluationID: number) {
    return await this.prisma.evaluation.delete({where : {id : evaluationID}});
  }
}
