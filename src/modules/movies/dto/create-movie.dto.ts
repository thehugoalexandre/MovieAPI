import { IsString, IsDateString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ required: true, example: 'Inception', description: 'The title of the movie' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, example: 'A mind-bending thriller', description: 'The description of the movie' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true, example: '2010-07-16', description: 'The release date of the movie' })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({ required: true, example: [1], description: 'Array of genre IDs associated with the movie' })
  @IsArray()
  @IsNotEmpty({ each: true })
  genres: number[];
}
