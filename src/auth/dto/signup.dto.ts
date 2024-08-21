import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7, { message: "Phone must be longer than 7" })
    phone: string;

    @IsOptional()
    @IsString()
    @IsEmail({}, { message: "Please enter correct email" })
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    verificationCode?: string;
}