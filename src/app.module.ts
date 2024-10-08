import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
// import { connection } from 'src/common/constants/connection';
import { DevConfigService } from './common/providers/DevConfigService';
import { Playlist } from './playlists/playlist.entity';
import { AuthModule } from './auth/auth.module';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database:process.env.DBNAME,
      host: 'localhost',
      port:5432,
      username:'postgres',
      password:process.env.PASSWORD,
      entities:[Song,Artist,User,Playlist],
      synchronize: true
    }),
    SongsModule,
    AuthModule,PlaylistsModule,UsersModule, ArtistsModule, SeedModule],
  controllers: [AppController],
  providers: [AppService,{provide: DevConfigService,
   useClass: DevConfigService
  }, SeedService,
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
