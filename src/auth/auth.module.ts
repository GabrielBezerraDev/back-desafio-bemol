import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { chatHistoryProviders } from './auth.provider';


@Module({
  imports: [
    UserModule,
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'testeJwt',
      signOptions: { expiresIn: '60m' },
    }),
  ],
    providers: [AuthService, LocalStrategy, JwtStrategy,...chatHistoryProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}