import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body(ValidationPipe) userData : CreateUserDto){
    return this.userService.createUser(userData);
  }
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) userId : number){
    return this.userService.findUser(userId);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId : number){
    return this.userService.deleteUser(userId)
  }
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) userId : number, @Body(ValidationPipe) userData : UpdateUserDto){
    return this.userService.updateUser(userId, userData)
  }
}
