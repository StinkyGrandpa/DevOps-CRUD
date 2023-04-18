import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,],
  imports: [UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'SuperGeheim',
      secretOrPrivateKey: 'SuperGeheim',
      signOptions: { expiresIn: '60m' },
    }),]
})
export class AuthModule { }
