import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt'
import { PayloadType } from './types';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ){}
    async login(loginDto: LoginDto
    ): Promise<User>{
        const user = await this.userService.findOne(loginDto);
        const passwordMatched = await bcrypt.compare(
            loginDto.password,
            user.password,
        );
        if(passwordMatched){
            delete user.password;
            const payload: PayloadType = {email: user.email, userId: user.id};
            const artist = await this.artistsService.findArtist(user.id)
            if(artist){
                payload.artistId = artist.id;
            }
            if(user.enable2FA && user.twoFASecret){
                // sends the validateToken request link
                // else otherwise sends the json web token in the response
                return {
                    validate2FA: 'http://localhost:3000/auth/validate-2fa',
                    message:
                      'Please sends the one time password/token from your Google Authenticator App',
                };
            }
            return {
                accessToken: this.jwtService.sign(payload),
            };
        } else{
            throw new UnauthorizedException('Password does not match');
        }

    }
    async enable2FA(userId: number): Promise<Enable2FAType>{
        const user = await this.userService.findById(userId);
        if(user.enable2FA){
            return {secret: user.twoFASecret};
        }
        const secret = speakeasy.generateSecret();
        console.log(secret);
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret);
        return {secret: user.twoFASecret}
    }
    async validate2FAToken(
        userId: number,
        token: string
    ): Promise<{verified: boolean}>{
        try {
            // find the user based on the id
            const user = await this.userService.findById(userId);

            // extract his 2FA secret
            // verify the secret with token by calling the speakeasy verify method
            const verified = speakeasy.toptp.verify({
                secret: user.twoFASecret,
                token: token,
                encoding: 'base32'
            });
            // if validated then sends the json web token in the response
            if(verified){
                return {verified: true};
            } else {
                return {verified: false}
            }
        } catch (error) {
            throw new UnauthorizedException('Error verifying token');
        }
    }
    async disable2FA(userId: number): Promise<UpdateResult>{
        return this.userService.disable2FA(userId);
    }
    async validateUserByApiKey(apiKey: string): Promise<User>{
        return this.userService.findByApiKey(apiKey)
    }
}
