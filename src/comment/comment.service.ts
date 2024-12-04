import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma : PrismaService){}
  async create(commentData:  CreateCommentDto) {
    const { content, userID, evaluationID } = commentData;
    const [userExists, evaluationExists] = await Promise.all([
      this.prisma.user.findUnique({where: { id: userID } }),
      this.prisma.evaluation.findUnique({ where: 
        { id: evaluationID } }),
    ]);
    if (!userExists) {throw new NotFoundException(`User with ID ${userID} not found`);} //testado

    if (!evaluationExists) {throw new NotFoundException(`Evaluation with ID ${evaluationID} not found`);} //testado

    return this.prisma.comment.create({
      data: {
        content, user: { connect: { id: userID } }, evaluation: { connect: { id: evaluationID } },
      },
    });
  }

  async findAll() {
    return this.prisma.comment.findMany({
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
       }, evaluation: true,},});}
    

  async findOne(commentID: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentID },
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
        evaluation: true 
      },
    });
    if (!comment){
      throw new NotFoundException(`Comment with ID ${commentID

      } not found`); //funcionando

    }
    return comment
  }

  async update(commentID: number, commentData: UpdateCommentDto) {
    const commentExists = await this.prisma.comment.findUnique({
      
      where: { id: commentID },});

    if (!commentExists) {
      
      throw new NotFoundException(`Comment with ID ${commentID} not found`); //rota funcionou tmb
    }

    return this.prisma.comment.update({
      
      where: { id: commentID },
      
      data: commentData,
    });
  }

  async remove(commentID: number) {
    return this.prisma.comment.delete({where : {id : commentID}}).catch((error) => {
      if (error.code === 'P2025'){

        throw new NotFoundException(`Comment with ID ${commentID} not found`); // funcionou
      }
            throw error;
    })
  }
}
