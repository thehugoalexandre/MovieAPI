import { IsString, IsDateString, IsArray } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  releaseDate: Date;

  @IsArray()
  genres: number[];
}
