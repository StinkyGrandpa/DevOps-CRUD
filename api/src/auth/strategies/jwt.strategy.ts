import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";
import { AUTH_JWT_SECRET } from "../auth.module";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: AUTH_JWT_SECRET,
        }) // config 
    }

    async validate(payload: User): Promise<User> {
        this.authService.isUserEnable(payload.enabled)

        //hier können noch daten über den user angefügt werden
        return payload
    }
}