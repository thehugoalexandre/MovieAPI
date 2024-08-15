import { IsString, IsDateString, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  releaseDate: Date;

  @IsArray()
  genres: number[];
}
