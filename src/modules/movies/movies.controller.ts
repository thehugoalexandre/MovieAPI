import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/src/http/guards/jwt.guard';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('Movies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get('all')
    findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
        return this.moviesService.findAll(Number(skip), Number(take));
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.moviesService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('search')
    search(@Query('title') title: string, @Query('genreIds') genreIds: number[]): Promise<Movie[]> {
        return this.moviesService.search(title, genreIds);
    }
}
