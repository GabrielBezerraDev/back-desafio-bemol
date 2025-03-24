// auth/auth.controller.ts
import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post, Request, Res, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login-user';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() userDTO: LoginUserDto, @Session() session) {
        let result = await this.authService.login(userDTO);
        console.log(result);
        if (result) session.user = { ...result };
        else {
            throw new UnauthorizedException('Email/CPF ou senha');
        }
        return result;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('sign-up')
    async SignUp(@Body() userDTO: CreateUserDto, @Session() session) {
        console.log(userDTO);
        let result = await this.authService.checkUserExist(userDTO);
        let newUser: User | null = null;
        if (result.length === 0) {
            newUser = await this.authService.createUser(userDTO);
            session.user = { ...result };
        }
        else {
            throw new ConflictException('Usuário existente!.');
        }
        return newUser;
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@Session() session, @Res() res: Response) {
        session.destroy(() => {
            res.clearCookie('connect.sid');
            return null;
        });
    }

}