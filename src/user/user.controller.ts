import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authservice:AuthService) {}

  @Get('/register')
  getregisterpage(@Res() res:Response){
    res.render('register')
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let user  = await this.userService.create(createUserDto);

    const payload ={
    id:user.id,
    username:user.username,
    email:user.email
    }

    let token = this.authservice.generateToken(payload)

    return token;
  }

  @ApiBearerAuth('jwt auth')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth('jwt auth')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth('jwt auth')
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
