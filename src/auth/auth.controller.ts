import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginRequestBody } from './dto/login-Request-Body.dto';
import { Public } from './decorators/isPublic.decorator';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  login(@Body() loginRequestBody : LoginRequestBody){
      return this.authService.login(loginRequestBody)
  }
  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('cadastro')
  // cadastro(@Body() cadastroRequestBody:CadastroRequestBody){
  //     return this.authService.cadastro(cadastroRequestBody)
  // }
}
