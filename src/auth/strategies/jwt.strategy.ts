import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsersService } from "src/users/users.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('ETCD_SECRET') private readonly etcdSecret: string,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: etcdSecret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersService.findByPhoneNumber(payload.phone);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}