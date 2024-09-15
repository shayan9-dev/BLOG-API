import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');


  const config = new DocumentBuilder()
    .setTitle('Blog-App')
    .setDescription('This is a free blog api')
    .setVersion('1.0')
    .addTag('Blogees').
    addBearerAuth({
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT',
      name:'JWT',
      description:'Enter auth key',
      in:'header'
    },'jwt auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();