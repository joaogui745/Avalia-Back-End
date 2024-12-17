import { AuthService } from './auth.service';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {LoginRequestBody } from './dto/login-Request-Body.dto';
import { Public } from './decorators/isPublic.decorator';
import { CreateUserDto } from 'src/user/dto/createUser.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequestBody : LoginRequestBody){
      return this.authService.login(loginRequestBody)
  }

  @Public()  
  @HttpCode(HttpStatus.CREATED)  
  @Post('cadastro')  
  cadastro(@Body() createUserDto: CreateUserDto) {
      return this.authService.cadastro(createUserDto)
  }
}
