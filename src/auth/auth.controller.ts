import { AuthService } from './auth.service';
import { CadastroRequestBody } from './dto/cadastro-Request-Body.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {LoginRequestBody } from './dto/login-Request-Body.dto';
import { Public } from './decorators/isPublic.decorator';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequestBody : LoginRequestBody){
      return this.authService.login(loginRequestBody)
  }
}
