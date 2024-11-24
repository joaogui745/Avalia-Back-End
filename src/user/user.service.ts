import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userData: CreateUserDto) {
    await this.prisma.user.create({ data: userData });
  }

  async findUser(id: number){

    return await this.prisma.user.findUnique({
      where: { id: id,},
    });
  }
  async deleteUser(id: number){
    return await this.prisma.user.delete({
      where: {


        id:id,
      }
    })
  }
}
