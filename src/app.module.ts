import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfessorModule } from './professor/professor.module';
import { SubjectModule } from './subject/subject.module';
import { CommentModule } from './comment/comment.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [UserModule, PrismaModule, ProfessorModule, SubjectModule, CommentModule, EvaluationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
