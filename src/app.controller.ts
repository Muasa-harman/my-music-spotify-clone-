import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'src/common/constants/connection';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    // @Inject('CONNECTION') private connection: Connection
  ){} //{console.log(`This is the connection string ${this.connection.CONNECTION_STRING}`);}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
