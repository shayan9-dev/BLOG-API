import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';



@Injectable()
export class AuthService {
 
  constructor(private readonly jwtservice:JwtService){}

  generateToken(payload:any){
    return this.jwtservice.sign(payload)
  }

 
}
