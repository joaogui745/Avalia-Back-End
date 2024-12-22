import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/createProfessor.dto';
import { UpdateProfessorDto } from './dto/updateProfessor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessorService {
  constructor(private readonly prisma : PrismaService){}
  async create(professorData: CreateProfessorDto) {
    return await this.prisma.professor.create({
      data: professorData
    }) //Então, dá pra criar 2 professores iguais, mas isso resolve no front 
  }

  async findAll() {
    return await this.prisma.professor.findMany({
      include: { subject: true,

      },
  });
  }

  async findOne(professorID: number) {
    const professor = await this.prisma.professor.findUnique({
      where:{id: professorID}, include:{

        subject: true,
      }
    })
if (!professor){
  throw new NotFoundException(`Professor com ID ${professorID} não encontrado`);
}
return professor;
  }

  async update(professorID: number, professorData: UpdateProfessorDto) {
    const professorExiste = await this.prisma.professor.findUnique({
      where: {id: professorID

      }

    })
    if (!professorExiste ){

throw new NotFoundException(`Professor com ID ${professorID} não encontrado`);
    }
    return await this.prisma.professor.update({

      where:{
        id: professorID

      },
      data:{
        name: professorData.name,
      department:professorData.department,
      }
    })
  }
  async remove(professorID: number) {
    return await this.prisma.professor.delete({
      where: {id: professorID}
    }).catch((error) => {
      if (error.code === 'P2025'){ throw new NotFoundException(`Professor com ID ${professorID} não encontrado`) // rotas testadas


      }
      throw error

    }

  )}

  async getSubjectsForProfessor(professorId: number) {
    return this.prisma.evaluation.findMany({
      where: {
        professorID: professorId,
      },
      select: {
        subject: true, // Inclui informações das disciplinas
      },
      
    });
  }

  async getEvaluationsForProfessor(professorId: number) {
    return this.prisma.evaluation.findMany({
      where: {
        professorID: professorId,
      },
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

  }});
  }

}
