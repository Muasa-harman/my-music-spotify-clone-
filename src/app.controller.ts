import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'src/common/constants/connection';
import { JwtAuthGuard } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    // @Inject('CONNECTION') private connection: Connection
  ){} //{console.log(`This is the connection string ${this.connection.CONNECTION_STRING}`);}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request,
  ){
    return request.user
  }
}
