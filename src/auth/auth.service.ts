// auth/auth.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>
    ) { }

    async validateUser(user: LoginUserDto): Promise<any> {
        const userDB = await this.checkUserExist(user);
        if (userDB.length > 0) {
            if (bcrypt.compareSync(user.password, userDB[0].password)) {
                return user;
            }
        }
        return null;
    }

    async checkUserExist(user: LoginUserDto) {
        return await this.userRepository.find({
            where: [
                { email: user.email },
                { cpf: user.cpf }
            ]
        });
    }

    async createUser(user: CreateUserDto) {
        let newUser: User = new User();
        const saltRounds = 10;
        const senhaHash = bcrypt.hashSync(user.password, saltRounds);
        newUser.cpf = user.cpf;
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.password = senhaHash;
        return this.userRepository.save(newUser);
    }

    async login(user: LoginUserDto) {
        let userDB = await this.validateUser(user);
        return userDB ? { user: { ...userDB }, access_token: this.jwtService.sign({ userId: userDB.userId, }) } : null;
    }
}