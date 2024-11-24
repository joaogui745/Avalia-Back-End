import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma : PrismaService){}
  async create(commentData: CreateCommentDto) {
    return await this.prisma.comment.create({data : commentData})
  }

  async findAll() {
    return await this.prisma.comment.findMany();
  }

  async findOne(commentID: number) {
    return await this.prisma.comment.findUnique({where : {id : commentID}});
  }

  async update(commentID: number, commentData: UpdateCommentDto) {
    return this.prisma.comment.update({where : {id : commentID}, data : commentData});
  }

  async remove(commentID: number) {
    return this.prisma.comment.delete({where : {id : commentID}});
  }
}
