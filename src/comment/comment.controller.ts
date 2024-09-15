import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiBearerAuth('jwt auth')
@ApiTags('Comment')
@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("/:userid/:postid")
  create(@Body() createCommentDto: CreateCommentDto,@Param('userid')userid:string,@Param('postid') postid:string) {
    return this.commentService.create(createCommentDto,userid,postid);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id) ,console.log("helo" + id);
  }

  @Get('Commentsbypostid/:id')
  findcommentbypostid(@Param('id') id: string) {
    return this.commentService.findcommentbypostid(id) ;
  }

  @Get('Commentsbyuserid/:id')
  findcommentbyuserid(@Param('id') id: string) {
    return this.commentService.findcommentbyuserid(id) ;
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
