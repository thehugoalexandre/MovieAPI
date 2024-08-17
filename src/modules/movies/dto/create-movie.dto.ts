import { IsString, IsDateString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'The title of the movie' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A mind-bending thriller', description: 'The description of the movie' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2010-07-16', description: 'The release date of the movie' })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({ example: [1, 2], description: 'Array of genre IDs associated with the movie' })
  @IsArray()
  @IsNotEmpty({ each: true })
  genres: number[];
}
