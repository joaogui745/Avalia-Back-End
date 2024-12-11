import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma : PrismaService){}
    
    async createUser(userData : CreateUserDto){
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new ConflictException('This email is already in use.'); //mensagem de email já em uso
        }
        const hashedPassword = await bcrypt.hash(userData.passWord,10)
        const user = await this.prisma.user.create({
            data: {
                ...userData,
                passWord:hashedPassword,
            },
            select:{
                id: true,
                name: true,
                email :true,
                department: true,
                course: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true, //retorna as informções, menos as sensíveis (senha)
            },
        });
        return user; //novo return, sem retornar senha do usuário
    }
    async findUser(userId : number){ //usando o método findUnique duas vezes, poderia ser feito em uma só vez
        const user = await this.prisma.user.findUnique({where : {id: userId}});
        if (!user){
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }

        const usuario = await this.prisma.user.findUnique({
            where: {id: userId}, 
            select:{
                id: true,
                name: true,
                email :true,
                department: true,
                course: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true
            },
        });
        return usuario //retorna sem senha

    }
    
    async deleteUser(userId : number){
        const user = await this.prisma.user.findUnique({where : {id: userId}});
        if (!user){
            throw new NotFoundException(`User with ID ${userId} not found.`); //rota funcionando
        }
        const usuario = await this.prisma.user.delete({
            where: {id: userId}, select:{
                id: true,
                name: true,
                email :true,
                department: true,
                course: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true
                
            },
        });
            return usuario //retorna sem senha

       
    }
    async updateUser(userId : number, userData : UpdateUserDto){
        const user = await this.prisma.user.findUnique({where : {id: userId}});
        if (!user){
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }
        if (userData.email){
            const existingUser = await this.findByEmail(userData.email);
            if(existingUser && existingUser.id != userId){
                throw new ConflictException('this email is already in use.',);
            }
        }
        const hashedPassword = await bcrypt.hash(userData.passWord,10)
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                ...userData,
                passWord:hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email :true,
                department: true,
                course: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true, //retorna as informções, menos as sensíveis (senha)

            },
        });
    }
    async findByEmail(email: string) { //Buscar por email
        // const user = await this.prisma.user.findUnique({where : {email: email}});
        // if (!user){
        //     throw new NotFoundException(`User with email address ${email} not found.`);
        // }
        // o findbyemail é apenas um método para verificar se já existe um email, ele não precisa retornar se não encontrou
        return await this.prisma.user.findUnique({

            where: {email: email},
        })

    }
}
