import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SuperGeheim'
        }) // config 
    }

    async validate(payload: User): Promise<User> {
        this.authService.isUserEnable(payload.enabled)

        //hier können noch daten über den user angefügt werden
        return payload
    }
}