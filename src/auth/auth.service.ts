import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(loginDto: LoginDto): Promise<User> {
        const { phone, password, verificationCode } = loginDto;

        const user = await this.usersService.findByPhoneNumber(phone);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        if (verificationCode && verificationCode !== user.verificationCode) {
            throw new UnauthorizedException("Invalid verification code");
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid Password");
        }
        
        return user;
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string, name: string }> {
        const user = await this.validateUser(loginDto);

        const payload: JwtPayload = { phone: user.phone, sub: user._id.toString() };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken, name: user.name };
    }

    async signup(signupDto: SignUpDto): Promise<User> {
        return this.usersService.create(signupDto);
    }
}
