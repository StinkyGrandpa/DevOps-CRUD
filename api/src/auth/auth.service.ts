import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { JWT } from './entities/jwt.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(createAuthDto: CreateAuthDto) {
    // Find user by username
    const user = await this.userService.findOneByUsername(createAuthDto.username);
    // Check if user exists, if not throw UNAUTHORIZED
    if (!user) throw new UnauthorizedException('Bitte gib Benutzername und Passwort ein');
    if (!user.enabled) throw new UnauthorizedException('Nutzer gesperrt');

    // Compare password hashes
    if (!bcrypt.compareSync(createAuthDto.password, user.password)) {
      throw new UnauthorizedException('Benutzername und Passwort stimmen nicht überein');
    }

    // Remove password from object
    const payload = { ...user };
    delete payload.password;
    // Create jwt
    // const token = this.jwtService.sign(user, { 
    //   secret: 'SuperGeheim', 
    //   expiresIn: '1d' 
    // });
    const token = await this.jwtService.signAsync(payload).catch((err: Error) => {
      console.error(err);
      throw new BadRequestException("Token konnte nicht erzeugt werden")
    });
    // Return as object holding a token value
    return new JWT(token);
  }

  validate() {
    return true;
  }

  isUserEnable(state: boolean) {
    if (!state) throw new UnauthorizedException('Nutzer gesperrt')
  }

  async hasUserDataChanged(user: User) {
    const userdb = await this.userService.findOneByUsername(user.username);

  }
}
