import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { use } from 'passport';



@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(createAuthDto: CreateAuthDto) {

    const user = await this.userService.findOneByUsername(createAuthDto.username);
    if (!user) throw new UnauthorizedException('Daten passen nicht!');

    if (!bcrypt.compareSync(createAuthDto.password, user.password)) {
      throw new UnauthorizedException('Daten passen nicht!');
    }
    const { password, ...payload } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return this.jwtService.sign(payload
      , { secret: 'SuperGeheim', expiresIn: '1h' });

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
