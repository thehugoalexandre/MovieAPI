import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'hugo@localhost.com', description: 'The new email of the user' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: 'newPassword@123', description: 'The new password of the user' })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
}
