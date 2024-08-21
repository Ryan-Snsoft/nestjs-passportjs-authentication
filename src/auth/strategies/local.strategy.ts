import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "src/users/schemas/user.schema";
import { LoginDto } from "../dto/login.dto";
import { Request } from "express";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // override the default fields 
        super({ 
            usernameField: 'phone',
            passwordField: 'phone', // password optional
            passReqToCallback: true, // Pass entire request to the callback
        });
    }

    async validate(req: Request, phone: string): Promise<User> {
        console.log('Local Request Body:', req.body);

        const loginDto = new LoginDto();
        loginDto.phone = phone;
        loginDto.password = req.body.password;
        loginDto.verificationCode = req.body.verificationCode;

        if (!loginDto.password && !loginDto.verificationCode) {
            throw new UnauthorizedException('Must provide either password or SMS verification code');
        }

        const user = await this.authService.validateUser(loginDto);
        
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return user;
    }
}