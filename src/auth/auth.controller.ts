import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,    

    ){}
    @Post('signup')
    signup(
        @Body()
        userDto: CreateUserDto
    ): Promise<User>{
        return this.userService.create(userDto);
    }
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ): Promise<User>{
        return this.authService.login(loginDto)
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(
        @Request()
        req,
    ): Promise<Enable2FAType>{
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId);
    }
    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(
        @Request(),
        req,
        @Body()
        ValidateTokenDto: ValidateTokenDto,
    ): Promise<{verified: boolean}>{
        return this.authService.validate2FAToken(
            req.user.userId,
            ValidateTokenDto.token,
        );
    }
    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(
        @Request()
        req,
    ): Promise<UpdateResult>{
        return this.authService.disable2FA(req.user.userId);
    }
    @Get('profile')
    @UseGuards(AuthGuard('bearer'))
    getProfile(
        @Request()
        req,
    ){
        delete req.user.password;
        return {
            msg: 'authenticated with api key',
            user: req.user
        }
    }
}
