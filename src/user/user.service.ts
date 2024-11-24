import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma : PrismaService){}
    async createUser(userData : CreateUserDto){
        return await this.prisma.user.create({data : userData})
    }
    async findUser(userId : number){
        return await this.prisma.user.findUnique({
            where : {id: userId},
        })
    }
    async deleteUser(userId : number){
        return this.prisma.user.delete({where : {id : userId}});
    }
    async updateUser(userId : number, userData : UpdateUserDto){
        return this.prisma.user.update({where : {id : userId}, data: userData})
    }
}
