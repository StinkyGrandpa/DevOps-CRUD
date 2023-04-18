import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService
    ) {
        super() // config 
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.login({ password: password, username: username })
        //user gefunden und nutzer elraubt?
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}