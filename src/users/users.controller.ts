import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from '../auth/dto/signup.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() signupDto: SignUpDto) {
    return this.usersService.create(signupDto);
  }
}
