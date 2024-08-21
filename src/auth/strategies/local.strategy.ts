import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "src/users/schemas/user.schema";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // override the default fields 
        super({ 
            usernameField: 'phone',
            passwordField: 'password',
        });
    }

    async validate(phone: string, password: string): Promise<User> {
        const loginDto = new LoginDto();
        loginDto.phone = phone;
        loginDto.password = password;

        const user = await this.authService.validateUser(loginDto);
        
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}