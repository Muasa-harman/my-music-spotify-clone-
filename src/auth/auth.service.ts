import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt'

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
            return user;
        } else{
            throw new UnauthorizedException('Password does not match');
        }

    }
}
