import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post() //funcionou
  create(@Body(ValidationPipe) commentData: CreateCommentDto, @CurrentUser() currentUser: UserPayload) {
    if (commentData.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível criar posts para sua conta")
    return this.commentService.create(commentData);      //só cria commentários com um evaluationID existente?
  }


  @Get()
  findAll() { //não sei se deveria ter validação ou não
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { //não sei se deveria ter validação ou não 
    return this.commentService.findOne(+id);
  }

  @Patch(':id') //não testado
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto , @CurrentUser() currentUser: UserPayload) {
    if (updateCommentDto.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível editar comentários da sua conta")
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id') //não está funcionando
  remove(@Param('id') id: string, @Body() commentData: CreateCommentDto, @CurrentUser() currentUser: UserPayload) {
    if (commentData.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível remover comentários da sua conta")
    return this.commentService.remove(+id);
  }
}
