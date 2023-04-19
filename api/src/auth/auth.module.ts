import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';

export const AUTH_JWT_SECRET = "SUPER_SECURE_SECRET_KEY_CHANGE_IN_PRODUCTION";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: AUTH_JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService
  ],
})
export class AuthModule { }
