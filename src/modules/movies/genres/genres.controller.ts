import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { JwtAuthGuard } from '@/src/http/guards/jwt.guard';
import { Genre } from './entities/genre.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';

@ApiTags('Genres')
@ApiBearerAuth()
@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) { }

    @ApiOperation({ summary: 'Retrieve all genres' })
    @ApiResponse({ status: 200, description: 'List of genres retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Genre[]> {
        return this.genresService.findAll();
    }

    @ApiOperation({ summary: 'Retrieve a genre by ID' })
    @ApiResponse({ status: 200, description: 'Genre retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Genre not found.' })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Genre> {
        return this.genresService.findOne(id);
    }

    @ApiOperation({ summary: 'Create a new genre' })
    @ApiResponse({ status: 201, description: 'Genre created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() genre: CreateGenreDto): Promise<Genre> {
        return this.genresService.create(genre);
    }

    @ApiOperation({ summary: 'Delete a genre by ID' })
    @ApiResponse({ status: 204, description: 'Genre deleted successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Genre not found.' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.genresService.remove(id);
    }
}
