import { IsOptional, IsString, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMoviesDto {
    @ApiProperty({ description: 'Title of the movie', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: 'Comma-separated string of genre IDs (e.g., "1,2,3")',
        required: false,
        type: String,
        example: "1,2",
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(id => Number(id.trim()));
        } else if (Array.isArray(value)) {
            return value.map(id => Number(id));
        }
        return value;
    })
    genreIds?: number[];
}
