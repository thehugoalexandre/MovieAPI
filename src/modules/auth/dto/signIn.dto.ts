import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty({ required: true, example: 'hugo@localhost.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: 'Password@123', minLength: 6 })
    @IsString()
    password: string;
}
