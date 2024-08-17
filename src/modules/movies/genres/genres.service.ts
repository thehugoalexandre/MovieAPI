import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private genresRepository: Repository<Genre>,
    ) { }

    findAll(): Promise<Genre[]> {
        return this.genresRepository.find({ relations: ['movies'] });
    }

    findOne(id: number): Promise<Genre> {
        return this.genresRepository.findOne({ where: { id }, relations: ['movies'] });
    }

    async findByIds(ids: number[]): Promise<Genre[]> {
        return this.genresRepository.findBy({ id: In(ids) });
    }

    create(genre: Genre): Promise<Genre> {
        return this.genresRepository.save(genre);
    }

    remove(id: number): Promise<void> {
        return this.genresRepository.delete(id).then(() => { });
    }
}
