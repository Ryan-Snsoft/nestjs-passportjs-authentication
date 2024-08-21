import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7, { message: "Phone must be longer than 7" })
    phone: string;

    @IsString()
    @IsOptional()
    @IsEmail({}, { message: "Please enter correct email" })
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsString()
    @IsOptional()
    verificationCode?: string;
}