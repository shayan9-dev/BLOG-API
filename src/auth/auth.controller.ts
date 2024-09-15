import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';


@Controller('')
export class AuthController {
  constructor(private readonly jwtservice:JwtService) {}

  @ApiTags()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
 async loginUser(@Req() req,@Body() logindto:CreateAuthDto){

    let user:User = req.user;
   const payload = {
    id: user.id,
    email:user.email,
    username:user.username
   }

    let token = await this.jwtservice.sign(payload)
    return  token;
  }


 
}
