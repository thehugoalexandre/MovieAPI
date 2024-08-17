import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
    @ApiProperty({ required: true, example: 'Action', description: 'The name of the genre' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
