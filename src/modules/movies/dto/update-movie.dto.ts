import { IsString, IsDateString, IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiPropertyOptional({ example: 'Inception', description: 'The title of the movie' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'A mind-bending thriller', description: 'The description of the movie' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2010-07-16', description: 'The release date of the movie' })
  @IsDateString()
  @IsOptional()
  releaseDate?: Date;

  @ApiPropertyOptional({ example: [1, 2], description: 'Array of genre IDs associated with the movie' })
  @IsArray()
  @IsOptional()
  genres?: number[];
}
