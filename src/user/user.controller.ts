import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body(ValidationPipe) userData: CreateUserDto) {
    await this.userService.create(userData);
  }
  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number){
    return await this.userService.findUser(id);
  }
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number){
    return await this.userService.deleteUser(id);
  }
  }
