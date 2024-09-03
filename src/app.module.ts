import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
// import { connection } from 'src/common/constants/connection';
import { DevConfigService } from './common/providers/DevConfigService';
import { Playlist } from './playlists/playlist.entity';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database:'spotify-clone',
      host: 'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      entities:[Song,Artist,User,Playlist],
      synchroni
    }),
    SongsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,{provide: DevConfigService,
   useClass: DevConfigService
  },
  //  {provide: 'CONNECTION', 
    // useValue: connection,},
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs')
    // or
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs',method: RequestMethod.POST})
    // or
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  };
}
