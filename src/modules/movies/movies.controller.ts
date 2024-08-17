import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/src/http/guards/jwt.guard';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { SearchMoviesDto } from './dto/search-movies.dto';

@ApiTags('Movies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @ApiOperation({ summary: 'Create a new movie' })
    @ApiResponse({ status: 201, description: 'Movie created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @ApiOperation({ summary: 'Retrieve all movies with pagination' })
    @ApiResponse({ status: 200, description: 'List of movies retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Get('all')
    findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
        return this.moviesService.findAll(Number(skip), Number(take));
    }

    @ApiOperation({ summary: 'Update a movie by ID' })
    @ApiResponse({ status: 200, description: 'Movie updated successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Movie not found.' })
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @ApiOperation({ summary: 'Delete a movie by ID' })
    @ApiResponse({ status: 204, description: 'Movie deleted successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Movie not found.' })
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.moviesService.delete(id);
    }

    @ApiOperation({ summary: 'Search movies by title and/or genre IDs' })
    @ApiResponse({ status: 200, description: 'Movies retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Get('search')
    search(@Query() searchParams: SearchMoviesDto): Promise<Movie[]> {
        return this.moviesService.search(searchParams.title, searchParams.genreIds);
    }
}