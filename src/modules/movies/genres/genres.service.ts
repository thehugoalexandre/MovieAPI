import { ConflictException, NotFoundException, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
    ) { }

    async findAll(): Promise<Genre[]> {
        return this.genresRepository.find({ relations: ['movies'] });
    }

    async findOne(id: number): Promise<Genre> {
        const genre = await this.genresRepository.findOne({ where: { id }, relations: ['movies'] });
        if (!genre) {
            throw new NotFoundException(`Genre with ID ${id} not found.`);
        }
        return genre;
    }

    async findByIds(ids: number[]): Promise<Genre[]> {
        const genres = await this.genresRepository.findBy({ id: In(ids) });
        if (genres.length !== ids.length) {
            throw new BadRequestException('Some genres not found.');
        }
        return genres;
    }

    async create(createGenreDto: CreateGenreDto): Promise<Genre> {
        const existingGenre = await this.genresRepository.findOne({
            where: { name: createGenreDto.name },
        });

        if (existingGenre) {
            throw new ConflictException(`A genre with the name '${createGenreDto.name}' already exists.`);
        }

        const genre = this.genresRepository.create(createGenreDto);
        return this.genresRepository.save(genre);
    }

    async remove(id: number): Promise<void> {
        const genre = await this.genresRepository.findOne({ where: { id }, relations: ['movies'] });

        if (!genre) {
            throw new NotFoundException(`Genre with ID ${id} not found.`);
        }

        if (genre.movies && genre.movies.length > 0) {
            throw new BadRequestException(`Genre with ID ${id} cannot be deleted because it is associated with movies.`);
        }

        await this.genresRepository.delete(id);
    }
}
