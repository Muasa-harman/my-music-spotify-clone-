import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { authConstants } from './dto/auth.constants';
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from './jwt-strategy'
import { ApiKeyStrategy } from './api-key-strategy';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [UsersModule,JwtModule.register({
    secret: authConstants.secret,
    signOptions: {
      expiresIn: '1d',
    },
  }),ArtistsModule],
  providers: [AuthService,JwtStrategy,ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
