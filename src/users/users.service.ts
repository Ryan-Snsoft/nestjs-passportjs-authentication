import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User> 
    ) {}

    async findByPhoneNumber(phone: string): Promise<User | undefined> {
        return this.userModel.findOne({ phone }).exec();
    }

    async create(signupDto: SignUpDto): Promise<User> {
        const { password, ...userData } = signupDto;

        const newUserData: Partial<SignUpDto> = { ...userData };

        if (password) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            newUserData.password = hashedPassword;
        }

        const newUser = new this.userModel(newUserData as User);
        return newUser.save();
    }
}
