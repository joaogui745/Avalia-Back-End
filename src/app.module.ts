import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfessorModule } from './professor/professor.module';
import { SubjectModule } from './subject/subject.module';
import { CommentModule } from './comment/comment.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth-guard';

@Module({
  imports: [UserModule, PrismaModule, ProfessorModule, SubjectModule, CommentModule, EvaluationModule, AuthModule,JwtModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [],
  providers: [{provide: APP_GUARD,useClass: AuthGuard,},],
})
export class AppModule {}
