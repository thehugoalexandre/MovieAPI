import { ApiProperty } from '@nestjs/swagger';
import { MovieResponseDto } from '../../dto/movie-response.dto';

export class GenreResponseDto {
    @ApiProperty({ example: 1, description: 'The unique identifier of the genre' })
    id: number;

    @ApiProperty({ example: 'Action', description: 'The name of the genre' })
    name: string;

    @ApiProperty({ type: () => [MovieResponseDto], description: 'The movies associated with this genre', required: false })
    movies?: MovieResponseDto[];
}
