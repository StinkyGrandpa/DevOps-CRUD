import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) {
        // super({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //     ignoreExpiration: false,
        //     secretOrKey: 'Cedrichatnenkleinen'
        // }) // config 

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SuperGeheim'
        }) // config 
        // super()
    }

    async validate(payload: User): Promise<User> {
        console.log('sad')

        if (!(payload)) console.log('invalid')
        this.authService.isUserEnable(payload.enabled)

        //hier können noch daten über den user angefügt werden
        return payload
    }
}