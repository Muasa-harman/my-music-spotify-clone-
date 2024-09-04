import { Injectable } from "@nestjs/common";
import { authConstants } from "./dto/auth.constants";
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstants.secret,
        });
    }

    async validate(payload: any){
        return {userId: payload.sub, email: payload.email
        }
    }
}