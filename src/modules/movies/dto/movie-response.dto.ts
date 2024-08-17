import { ApiProperty } from '@nestjs/swagger';
import { GenreResponseDto } from '../genres/dto/genre-response.dto';

export class MovieResponseDto {
    @ApiProperty({ example: 1, description: 'The unique identifier of the movie' })
    id: number;

    @ApiProperty({ example: 'Inception', description: 'The title of the movie' })
    title: string;

    @ApiProperty({ example: 'A mind-bending thriller', description: 'The description of the movie' })
    description: string;

    @ApiProperty({ example: '2010-07-16', description: 'The release date of the movie' })
    releaseDate: Date;

    @ApiProperty({ type: () => [GenreResponseDto], description: 'The genres associated with the movie' })
    genres: GenreResponseDto[];
}
