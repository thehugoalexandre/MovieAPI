import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Genre } from './entities/genre.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
    ) { }

    async create(movieData: CreateMovieDto): Promise<Movie> {
        const genres = await this.genresRepository.findBy({ id: In(movieData.genres) });
        const movie = this.moviesRepository.create({
            title: movieData.title,
            description: movieData.description,
            releaseDate: movieData.releaseDate,
            genres
        });
        return this.moviesRepository.save(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.moviesRepository.find({ relations: ['genres'] });
    }

    async findOne(id: number): Promise<Movie> {
        return this.moviesRepository.findOne({ where: { id }, relations: ['genres'] });
    }

    async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        const movie = await this.findOne(id);
        const genres = await this.genresRepository.findByIds(updateMovieDto.genres);
        return this.moviesRepository.save({ ...movie, ...updateMovieDto, genres });
    }

    async delete(id: number): Promise<void> {
        await this.moviesRepository.delete(id);
    }
}
