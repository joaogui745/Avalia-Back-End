import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestBody } from './dto/login-Request-Body.dto';
import { UserService } from 'src/user/user.service';
import { UserToken } from './types/UserToken';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './types/UserPayload';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService : UserService, 
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService,){}

  async login(loginRequestBody:LoginRequestBody):Promise<UserToken>{
    const user = await this.validateUser(loginRequestBody.email,loginRequestBody.passWord)
    if (!user){
      throw new UnauthorizedException('Email e/ou senha inválidos.');
    }
    const payload:UserPayload={email:(await user).email,sub:(await user).id};

    const jwtToken=this.jwtService.sign(payload,{expiresIn:'1d',secret:this.configService.get('JWT_SECRET')});
    
    return{
      access_token:jwtToken
    }
  }
  async cadastro(createUserDto:CreateUserDto):Promise<UserToken>{
    const user=await this.userService.createUser(createUserDto)

    const payload:UserPayload={email:(await user).email,sub:(await user).id};

    const jwtToken=this.jwtService.sign(payload,{expiresIn:'1d',secret:this.configService.get('JWT_SECRET')});

    return {
      access_token:jwtToken
    }
  }

  async validateUser(email:string, passWord:string){
    const user=await this.userService.findByEmail(email);
    if (user){
      const isPasswordValid=await bcrypt.compare(passWord,user.passWord);
      if (isPasswordValid){
        return {
          ...user,
          passWord:undefined};
      }
    }
    return null;

  }
}
