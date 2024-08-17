import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GenresService } from './genres/genres.service';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
        private genresService: GenresService
    ) { }

    async create(movieData: CreateMovieDto): Promise<Movie> {
        // const existingMovie = await this.moviesRepository.findOne({ where: { title: movieData.title } });
        // if (existingMovie) {
        //     throw new ConflictException('This title already exists.');
        // }

        const genres = await this.genresService.findByIds(movieData.genres);
        if (genres.length !== movieData.genres.length) {
            throw new BadRequestException('Some genres not found.');
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
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        const movie = await this.findOne(id);

        const genres = await this.genresService.findByIds(updateMovieDto.genres);
        if (genres.length !== updateMovieDto.genres.length) {
            throw new BadRequestException('Some genres not found.');
        }

        return this.moviesRepository.save({ ...movie, ...updateMovieDto, genres });
    }


    async delete(id: number): Promise<void> {
        const movie = await this.findOne(id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }

        await this.moviesRepository.delete(id);
    }

    async search(title?: string, genreIds?: number[]): Promise<Movie[]> {
        const query = this.moviesRepository.createQueryBuilder('movie')
            .leftJoinAndSelect('movie.genres', 'genre');

        if (title) {
            query.andWhere('movie.title LIKE :title', { title: `%${title}%` });
        }

        if (genreIds && genreIds.length > 0) {
            query.andWhere('genre.id IN (:...genreIds)', { genreIds });
        }

        const movies = await query.getMany();

        if (movies.length === 0) {
            throw new NotFoundException('No movies found matching the search criteria.');
        }

        return movies;
    }

}
