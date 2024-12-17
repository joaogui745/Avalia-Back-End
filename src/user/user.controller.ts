import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { UserService} from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post() 
  createUser(@Body(ValidationPipe) userData : CreateUserDto){
    return this.userService.createUser(userData);
  }

  @Public()
  @Get('id/:id') //Eu coloquei a especificação id/:id por causa do novo @get, http://localhost:3000/user/id/#id#
  findUser(@Param('id', ParseIntPipe) userId : number){
    return this.userService.findUser(userId);
  }
  
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId : number, @CurrentUser() currentUser: UserPayload){
    if (userId !== currentUser.sub){
      throw new UnauthorizedException("Só é possível deletar sua própria conta.")
    }
    return this.userService.deleteUser(userId)
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) userId : number, @Body(ValidationPipe) userData : UpdateUserDto, @CurrentUser() currentUser: UserPayload){    
    if (userId !== currentUser.sub){
      throw new UnauthorizedException("Só é possível editar sua própria conta.")
    }
    return this.userService.updateUser(userId, userData)
  }
}
