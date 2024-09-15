import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports:[PassportModule,forwardRef(()=>UserModule),JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configservice:ConfigService)=>({
      secret:configservice.get('JWT_SECRET'),
      signOptions:{
        expiresIn:configservice.get<string>('JWT-EXP')+'s'
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
