import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(err, user, info: Error | string, context: ExecutionContext) {
        if (err || !user) {
            throw err || new UnauthorizedException(info);
        }
        return user;
    }
}