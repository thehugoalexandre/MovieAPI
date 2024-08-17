import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
    @ApiProperty({ example: 'Action', description: 'The name of the genre' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
