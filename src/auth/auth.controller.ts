import { Body, Controller, Post, Request as Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { User } from 'src/users/schemas/user.schema';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signup(signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request & { user: User }): Promise<{ accessToken: string, name: string }> {
        return this.authService.login(req.user);
    }

}
