import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>, private userserise:UserService
  ) {}

  // Create a new post
  async create(createPostDto: CreatePostDto, userid: string): Promise<Post> {
    const post = this.postRepository.create({
      title: createPostDto.title,
      des: createPostDto.des,
      user: await this.userserise.findOne(userid)
    });

    // Save the new post to the database
    const createdPost = await this.postRepository.save(post);
    return createdPost;
  }

  // Find all posts
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  // Find a single post by ID
  async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } });
  }

  // Update an existing post
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new Error('Post not found');
    }

    // Update post fields with new values
    post.title = updatePostDto.title ?? post.title;
    post.des = updatePostDto.des ?? post.des;

    return await this.postRepository.save(post);
  }

  // Remove a post by ID
  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }

 async findpostbyuserid(userid:string){
    await this.postRepository.findOne({relations:['user'],where:{user:{id: userid}}})
  }


}
