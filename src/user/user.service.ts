import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchError } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

   constructor(@InjectRepository(User)  private readonly userRepository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    let user:User = new User()
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password,salt);
    user.password = password;
   
    let createduser = await this.userRepository.save(user);

    return createduser;
  }
  findAll() { 

    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({where:{id:id}});
  }

  findbyemail(email: string) {
    return this.userRepository.findOne({where:{email:email}});
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
