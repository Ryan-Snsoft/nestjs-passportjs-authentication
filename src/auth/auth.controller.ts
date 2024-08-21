import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signup(signUpDto);
    }


    @Get('login')
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

}
