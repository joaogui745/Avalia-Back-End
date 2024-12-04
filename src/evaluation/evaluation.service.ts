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
    const { userID, professorID , subjectID } = evaluationData
    if (userID){ 
      const userExistis = await this.prisma.user.findUnique({
      where:{ id: userID }
    });
      if(!userExistis){
        throw new NotFoundException(`User with ID ${userID} not found`);
      }
    
    }
    if (professorID){ 
      const professorExistis = await this.prisma.user.findUnique({
      where:{ id: professorID
       }
    });
      if(!professorExistis){
        throw new NotFoundException(`professor with ID ${professorID} not found`);
      }
    
    }
    if (subjectID){ 
      const subjectExistis = await this.prisma.user.findUnique({
      where:{ id: subjectID }
    });
      if(!subjectExistis){
        throw new NotFoundException(`Subject with ID ${subjectID} not found`);
      }
    
    };
    return this.prisma.evaluation.update({where: {id: evaluationID

    }, data: evaluationData,}).catch((error) => { if(error.code === 'P2025' ){
      throw new NotFoundException(`Evaluation with ID ${evaluationID} not found`);
    }
    throw error;
  });



  }

  async remove(evaluationID: number) {
    return this.prisma.evaluation.delete({where:{ id: evaluationID},
    })
    .catch((error) => {
      if (error.code === 'P2025'){
      throw new NotFoundException(`Evaluation with ID ${evaluationID} not found`);
      }
      throw Error;

      

    })
  }
}