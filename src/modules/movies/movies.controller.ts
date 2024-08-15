import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IsOwnerGuard } from '@/src/http/guards/is-owner.guard';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ResourceType } from '@/src/http/common/decorators/resource-type.decorator';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    findAll() {
        return this.moviesService.findAll();
    }

    @Post()
    create(@Body() createMovieDto: any) {
        return this.moviesService.create(createMovieDto);
    }

    // @UseGuards(IsOwnerGuard)
    // @ResourceType('movie')
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    // @UseGuards(IsOwnerGuard)
    // @ResourceType('movie')
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.moviesService.delete(id);
    }
}
