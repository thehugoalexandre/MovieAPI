import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { GenresModule } from './genres/genres.module';
import { GenresService } from './genres/genres.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        GenresModule
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [MoviesService],
})
export class MoviesModule { }
