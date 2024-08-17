import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Genre } from './genres/entities/genre.entity';
import { GenresService } from './genres/genres.service';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
        private genresService: GenresService
    ) { }

    async create(movieData: CreateMovieDto): Promise<Movie> {
        const genres = await this.genresService.findByIds(movieData.genres);
        if (genres.length !== movieData.genres.length) {
            throw new Error('Some genres not found');
        }
        const movie = this.moviesRepository.create({
            title: movieData.title,
            description: movieData.description,
            releaseDate: movieData.releaseDate,
            genres,
        });
        return this.moviesRepository.save(movie);
    }

    async findAll(skip = 0, take = 10): Promise<Movie[]> {
        return this.moviesRepository.find({
            relations: ['genres'],
            skip,
            take,
        });
    }

    async findOne(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({ where: { id }, relations: ['genres'] });
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
    }

    async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        const movie = await this.findOne(id);
        const genres = await this.genresService.findByIds(updateMovieDto.genres);
        if (genres.length !== updateMovieDto.genres.length) {
            throw new Error('Some genres not found');
        }
        return this.moviesRepository.save({ ...movie, ...updateMovieDto, genres });
    }


    async delete(id: number): Promise<void> {
        const movie = await this.findOne(id);
        if (!movie) {
            throw new Error('Movie not found');
        }
        await this.moviesRepository.delete(id);
    }


    async search(title: string, genreIds: number[]): Promise<Movie[]> {
        const query = this.moviesRepository.createQueryBuilder('movie')
            .leftJoinAndSelect('movie.genres', 'genre')
            .where('movie.title LIKE :title', { title: `%${title}%` });

        if (genreIds.length) {
            query.andWhere('genre.id IN (:...genreIds)', { genreIds });
        }
        return await query.getMany();
    }

}
