import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {

  constructor(@InjectRepository(Comment) private readonly CommentRepo:Repository<Comment>,private userservice:UserService, private postservice:PostService){}
  
   async create(createCommentDto: CreateCommentDto,userid:string,postid:string) {
    let comment:Comment = new Comment();
    comment.message = createCommentDto.message;
    comment.user = await this.userservice.findOne(userid);
    comment.post = await this.postservice.findOne(postid)

    let createdComent = this.CommentRepo.save(comment)
    return createdComent;
  }

  findAll() {
    return this.CommentRepo.find();
  }

  findOne(id: string) {
    return this.CommentRepo.findOne({where:{id}});
  }


  remove(id: number) {
    return this.CommentRepo.delete(id);
  }

  async findcommentbypostid(id:string){
      return this.CommentRepo.findOne({relations:['post'],where:{post:{id:id}}})
  }

  async findcommentbyuserid(id:string){
    return await this.CommentRepo.findOne({relations:['user'],where:{user:{id:id}}})
  }
}
