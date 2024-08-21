import {IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    phone: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    verificationCode?: string;
}