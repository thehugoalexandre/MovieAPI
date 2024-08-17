import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'Hugo', description: 'The name of the user' })
    @IsString()
    @IsOptional()
    name?: string;
}
