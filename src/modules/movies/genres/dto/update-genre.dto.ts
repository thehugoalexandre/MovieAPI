import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGenreDto {
    @ApiPropertyOptional({ example: 'Adventure', description: 'The new name of the genre' })
    @IsString()
    @IsOptional()
    name?: string;
}
