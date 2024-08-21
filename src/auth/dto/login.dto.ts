import {IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    phone: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsString()
    @IsOptional()
    verificationCode?: string;
}