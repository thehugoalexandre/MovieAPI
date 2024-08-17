import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty({ example: 'user@localhost.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password@123', minLength: 6 })
    @IsString()
    password: string;
}
