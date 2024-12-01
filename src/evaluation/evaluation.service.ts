import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/createEvaluation.dto';
import { UpdateEvaluationDto } from './dto/updateEvaluation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma : PrismaService){}
  async create(EvaluationData: CreateEvaluationDto) {
    const { content, userID, professorID, subjectID } = EvaluationData;
    const [ userExists, professorExistis, subjectExists] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userID } }),
      this.prisma.professor.findUnique({ where: { id: professorID } }),
      this.prisma.subject.findUnique({ where: { id: subjectID} }),
    ]);
    if (!userExists){
      throw new NotFoundException(`User with ID ${userID} not found`); 
    }
    if (!professorExistis){
      throw new NotFoundException(`Professor with ID ${professorID} not found`);
    }
    if (!subjectExists){
      throw new NotFoundException(`Subject with ID ${subjectID} not found`); //todas rotas funcionando :joia:
    }
    return this.prisma.evaluation.create({
      data: { content, user:{connect:{ id : userID }}, professor:{connect: { id: professorID }}, subject:{connect:{ id: subjectID }},
        
      }
    });
  }
  

  async findAll() {
    return await this.prisma.evaluation.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            course: true,
            profilePic: true,
          }
        },
        professor: true, 
        subject: true,
      }, //retorna outras informações junto
    });
  }

  async findOne(evaluationID: number) {

    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id: evaluationID },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            course: true,
            profilePic: true,
          }
        },
        professor: true,
        subject: true, //retorna outras informações junto
      },
    });
    if (!evaluation){
      throw new NotFoundException(`Evaluation with ID ${evaluationID} not found`); //rota funcionando

    }
    return evaluation
  }

  async update(evaluationID: number, evaluationData: UpdateEvaluationDto) {
    return await this.prisma.evaluation.update({where : {id : evaluationID}, data : evaluationData});
  }

  async remove(evaluationID: number) {
    return await this.prisma.evaluation.delete({where : {id : evaluationID}});
  }
}
