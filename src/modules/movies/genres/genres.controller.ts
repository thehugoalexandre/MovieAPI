import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { JwtAuthGuard } from '@/src/http/guards/jwt.guard';
import { Genre } from './entities/genre.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Genres')
@ApiBearerAuth()
@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Genre[]> {
        return this.genresService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Genre> {
        return this.genresService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() genre: Genre): Promise<Genre> {
        return this.genresService.create(genre);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.genresService.remove(id);
    }
}
