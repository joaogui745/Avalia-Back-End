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
            throw new ConflictException('This email is already in use.'); //mensagem de email já em uso
    }       
        const user = await this.prisma.user.create({
        data: userData,
        select:{
        id: true,
        name: true,
        email :true,
        department: true,
        course: true,
        profilePic: true,
        createdAt: true,
        updatedAt: true,
        },
    });
        return user; //novo return, sem retornar senha do usuário
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
        const user = await this.prisma.user.findUnique({where : {id: userId}});
        if (!user){
            throw new NotFoundException('User with ID ${userID} not found.');
        }

        if (userData.email){
        const existingUser = await this.findByEmail(userData.email);

            if(existingUser && existingUser.id != userId)
                {
                    throw new ConflictException('this email is already in use.',);
            }
        }
        return this.prisma.user.update({

            where: { id: userId },
            data: userData,
            select: {
                id: true,
                name: true,
                email :true,
                department: true,
                course: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true,

            },
        });
    }
    async findByEmail(email: string) { //Buscar por email
        return await this.prisma.user.findUnique({

            where: {email: email},
        })

    }
}
