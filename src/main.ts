import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port'));

  if(module.hot){
    module.hot.accept();
    module.hot.dispose(()=> app.close());
  }
}
bootstrap();
