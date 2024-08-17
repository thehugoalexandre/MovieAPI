import { IsString, IsDateString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsArray()
  @IsNotEmpty({ each: true })
  genres: number[];
}
