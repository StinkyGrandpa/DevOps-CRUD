import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule
    /*.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.EXPIRE_TIME as string
          }
        }
      }
    })*/
  ],
  controllers: [], ///TODO: COntroller löschen wenn testen fertig
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
