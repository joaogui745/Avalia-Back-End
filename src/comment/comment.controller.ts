import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/types/UserPayload';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body(ValidationPipe) commentData: CreateCommentDto, @Body() @CurrentUser() currentUser: UserPayload) {
    if (commentData.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível criar posts para sua conta")
    return this.commentService.create(commentData);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { //não sei se deveria ter validação ou não 
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto , @CurrentUser() currentUser: UserPayload) {
    if (updateCommentDto.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível editar post para sua conta")
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() commentData: CreateCommentDto, @CurrentUser() currentUser: UserPayload) {
    if (commentData.userID !== currentUser.sub)
      throw new UnauthorizedException("Só é possível remover posts para sua conta")
    return this.commentService.remove(+id);
  }
}
