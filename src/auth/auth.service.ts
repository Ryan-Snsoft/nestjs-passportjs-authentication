import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, phone, email, password } = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            phone,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { phone, password } = loginDto;

        const user = await this.userModel.findOne({ phone });

        if (!user) {
            throw new UnauthorizedException('Invalid phone number or password')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid phone number or password')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }
}
