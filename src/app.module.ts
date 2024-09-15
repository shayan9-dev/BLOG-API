import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true, envFilePath:['.local.env']}),TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configservice:ConfigService)=>({
      type:'postgres',
      port:configservice.get('DB-PORT'),
      host:configservice.get('DB-HOST'),
      username:configservice.get('DB-USERNAME'),
      password:configservice.get('DB-PASSWORD'),
      database:configservice.get('DB-NAME'),
      synchronize:configservice.get('DB-SYNC'),
      entities:[__dirname+'/**/*.entity{.ts,.js}']

    })
  }) , UserModule, PostModule, CommentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
