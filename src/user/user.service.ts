import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma : PrismaService){}
    async createUser(userData : CreateUserDto){
        const existingUser = await this.findByEmail(   
            userData.email);
         if (existingUser) {
            throw new ConflictException('This email is already in use.'); //mensagem de email já em uso FUNCIONANDO
    }
        
        return await this.prisma.user.create({data : userData}) // E continua cadastrando normalmente
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
    async findByEmail(email: string) { //Buscar por email
        return await this.prisma.user.findUnique({

            where: {email: email},
        })

    }
}
